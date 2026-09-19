import { AfterViewChecked, Component, ElementRef, EventEmitter, Inject, Input, NgZone, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';

import { OAuthProvider } from '../../../../api/models/index';
import { LeafConfig } from '../../../../models/index';
import { LeafConfigServiceToken } from '../../../../services/leaf-config.module';
import { LeafSessionService } from '../../../../services/index';

declare var google: any;
declare var AppleID: any;

const GOOGLE_SDK_ID = 'leaf-google-gsi-script';
const GOOGLE_SDK_URL = 'https://accounts.google.com/gsi/client';
const APPLE_SDK_ID = 'leaf-apple-signin-script';
const APPLE_SDK_URL = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/{locale}/appleid.auth.js';
const DEFAULT_APPLE_LOCALE = 'en_US';

/** In-flight or resolved SDK loads, so several components share a single script tag. */
const sdkLoads: { [scriptId: string]: Promise<void> } = {};

let instanceCounter = 0;

/**
 * `login` signs the user in — registering the account when the provider identity
 * is unknown. `link` only hands the provider credential over through
 * `onCredential`, for callers attaching a provider to an account already signed
 * in.
 */
export type LeafSocialLoginMode = 'login' | 'link';

export interface LeafSocialCredential {
  provider: OAuthProvider;
  idToken: string;
  name?: string;
  firstname?: string;
  lastname?: string;
}

export interface LeafSocialLoginError {
  provider: OAuthProvider;
  error: any;
}

@Component({
  standalone: false,
  selector: 'leaf-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss'],
})
export class LeafSocialLoginComponent implements OnInit, OnChanges, AfterViewChecked, OnDestroy {
  @Input() public mode: LeafSocialLoginMode = 'login';
  @Input() public skipRedirect = false;
  @Input() public showGoogle = true;
  @Input() public showApple = true;
  @Input() public showSeparator = true;
  /** Translation key of the label drawn in the separator. */
  @Input() public separatorLabel = 'leaf.social-login.separatorLabel';
  /** Options forwarded as-is to `google.accounts.id.renderButton`. */
  @Input() public googleButtonOptions: { [option: string]: any } = {
    type: 'icon',
    theme: 'outline',
    size: 'large',
  };

  @Output() public onSuccess = new EventEmitter<OAuthProvider>();
  @Output() public onFailure = new EventEmitter<LeafSocialLoginError>();
  /** Emitted instead of signing in when `mode` is `link`. */
  @Output() public onCredential = new EventEmitter<LeafSocialCredential>();

  public googleEnabled = false;
  public appleEnabled = false;

  public readonly googleButtonId: string;
  public readonly appleButtonId: string;

  private appleSignInSuccessHandler = this.handleAppleSuccess.bind(this);
  private appleSignInFailureHandler = this.handleAppleFailure.bind(this);
  private appleListenersAttached = false;
  private googleInitialized = false;
  private appleInitialized = false;
  private destroyed = false;

  /**
   * The Apple SDK holds a single global configuration, so only the most recently
   * initialized component may answer its callbacks.
   */
  private static activeAppleInstance: LeafSocialLoginComponent = null;

  constructor(
    @Inject(LeafConfigServiceToken) private config: LeafConfig,
    private sessionService: LeafSessionService,
    private elementRef: ElementRef,
    private ngZone: NgZone
  ) {
    const instanceId = ++instanceCounter;
    this.googleButtonId = `leaf-google-signin-btn-${instanceId}`;
    this.appleButtonId = `leaf-apple-signin-btn-${instanceId}`;
  }

  ngOnInit() {
    this.syncEnabledProviders();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['showGoogle'] || changes['showApple']) {
      this.syncEnabledProviders();
    }
  }

  ngAfterViewChecked() {
    // The provider SDKs draw their button into an element of our template, so
    // they can only be initialized once that element exists — which also covers
    // a provider being shown again after its inputs changed.
    this.initPendingProviders();
  }

  ngOnDestroy() {
    this.destroyed = true;
    if (this.appleListenersAttached) {
      document.removeEventListener('AppleIDSignInOnSuccess', this.appleSignInSuccessHandler);
      document.removeEventListener('AppleIDSignInOnFailure', this.appleSignInFailureHandler);
      this.appleListenersAttached = false;
    }
    if (LeafSocialLoginComponent.activeAppleInstance === this) {
      LeafSocialLoginComponent.activeAppleInstance = null;
    }
  }

  private syncEnabledProviders() {
    const googleEnabled = this.showGoogle && !!this.config.oauth?.google?.clientId;
    if (googleEnabled !== this.googleEnabled) {
      this.googleEnabled = googleEnabled;
      this.googleInitialized = false;
    }

    const appleEnabled = this.showApple && !!this.config.oauth?.apple?.clientId;
    if (appleEnabled !== this.appleEnabled) {
      this.appleEnabled = appleEnabled;
      this.appleInitialized = false;
    }
  }

  private initPendingProviders() {
    if (this.destroyed) {
      return;
    }

    if (this.googleEnabled && !this.googleInitialized) {
      // Flagged before loading so the next change detection cycles do not start
      // the very same initialization all over again.
      this.googleInitialized = true;
      this.loadScript(GOOGLE_SDK_ID, GOOGLE_SDK_URL, () => typeof google !== 'undefined' && !!google.accounts)
        .then(() => this.initGoogleSignIn())
        .catch((error) => this.ngZone.run(() => {
          this.googleInitialized = false;
          this.emitFailure('google', error);
        }));
    }

    if (this.appleEnabled && !this.appleInitialized) {
      this.appleInitialized = true;
      const locale = this.config.oauth.apple.locale || DEFAULT_APPLE_LOCALE;
      this.loadScript(APPLE_SDK_ID, APPLE_SDK_URL.replace('{locale}', locale),
        () => typeof AppleID !== 'undefined' && !!AppleID.auth)
        .then(() => this.initAppleSignIn())
        .catch((error) => this.ngZone.run(() => {
          this.appleInitialized = false;
          this.emitFailure('apple', error);
        }));
    }
  }

  private initGoogleSignIn() {
    const buttonElement = this.findButtonElement(this.googleButtonId);
    if (!buttonElement || typeof google === 'undefined' || !google.accounts) {
      // Let the next change detection cycle try again once the slot is there.
      this.googleInitialized = false;
      return;
    }

    google.accounts.id.initialize({
      client_id: this.config.oauth.google.clientId,
      callback: (response: any) => this.ngZone.run(() => this.handleGoogleCredential(response)),
    });
    google.accounts.id.renderButton(buttonElement, this.googleButtonOptions);
  }

  private handleGoogleCredential(response: any) {
    if (!response || !response.credential) {
      this.emitFailure('google', 'missing_credential');
      return;
    }
    this.handleCredential({ provider: 'google', idToken: response.credential });
  }

  private initAppleSignIn() {
    const buttonElement = this.findButtonElement(this.appleButtonId);
    if (!buttonElement || typeof AppleID === 'undefined' || !AppleID.auth) {
      // Let the next change detection cycle try again once the slot is there.
      this.appleInitialized = false;
      return;
    }

    AppleID.auth.init({
      clientId: this.config.oauth.apple.clientId,
      scope: 'name email',
      redirectURI: this.config.oauth.apple.redirectUri || window.location.origin,
      usePopup: true,
    });
    LeafSocialLoginComponent.activeAppleInstance = this;

    if (!this.appleListenersAttached) {
      document.addEventListener('AppleIDSignInOnSuccess', this.appleSignInSuccessHandler);
      document.addEventListener('AppleIDSignInOnFailure', this.appleSignInFailureHandler);
      this.appleListenersAttached = true;
    }

    if (typeof AppleID.auth.renderButton === 'function') {
      buttonElement.innerHTML = '';
      AppleID.auth.renderButton({ id: this.appleButtonId });
    }
  }

  private handleAppleSuccess(event: any) {
    if (LeafSocialLoginComponent.activeAppleInstance !== this) {
      return;
    }
    const authorization = event?.detail?.authorization;
    if (!authorization || !authorization.id_token) {
      this.ngZone.run(() => this.emitFailure('apple', 'missing_id_token'));
      return;
    }

    // Apple only exposes the user identity on the very first sign-in: it is not
    // part of the ID token and is never sent again afterwards.
    const name = event?.detail?.user?.name;
    const firstname = name?.firstName || undefined;
    const lastname = name?.lastName || undefined;
    const fullName = [firstname, lastname].filter((part) => !!part).join(' ') || undefined;

    this.ngZone.run(() => this.handleCredential({
      provider: 'apple',
      idToken: authorization.id_token,
      name: fullName,
      firstname,
      lastname,
    }));
  }

  private handleAppleFailure(event: any) {
    if (LeafSocialLoginComponent.activeAppleInstance !== this) {
      return;
    }
    this.ngZone.run(() => this.emitFailure('apple', event?.detail?.error));
  }

  private handleCredential(credential: LeafSocialCredential) {
    if (this.mode === 'link') {
      this.onCredential.emit(credential);
      return;
    }

    this.sessionService.loginWithOAuth(credential.provider, credential.idToken, {
      name: credential.name,
      firstname: credential.firstname,
      lastname: credential.lastname,
      skipRedirect: this.skipRedirect,
      onSuccess: () => this.onSuccess.emit(credential.provider),
      onFailure: () => this.emitFailure(credential.provider, 'login_failed'),
    });
  }

  private emitFailure(provider: OAuthProvider, error: any) {
    this.onFailure.emit({ provider, error });
  }

  /** Scoped to our own template so concurrent instances never steal each other's slot. */
  private findButtonElement(buttonId: string): HTMLElement {
    if (this.destroyed) {
      return null;
    }
    return (this.elementRef.nativeElement as HTMLElement).querySelector<HTMLElement>(`#${buttonId}`);
  }

  /**
   * Injects a provider SDK once, and resolves as soon as it is ready — including
   * for the components mounting while the very same script is still loading.
   */
  private loadScript(scriptId: string, src: string, isReady: () => boolean): Promise<void> {
    if (sdkLoads[scriptId]) {
      return sdkLoads[scriptId];
    }

    sdkLoads[scriptId] = new Promise<void>((resolve, reject) => {
      const existingScript = document.getElementById(scriptId) as HTMLScriptElement;
      if (existingScript) {
        // Injected by the host application itself: it may already be usable, in
        // which case no further `load` event will ever be fired.
        if (isReady()) {
          resolve();
        } else {
          existingScript.addEventListener('load', () => resolve(), { once: true });
          existingScript.addEventListener('error', () => reject(new Error(`Failed to load ${src}`)), { once: true });
        }
        return;
      }

      const script = document.createElement('script');
      script.id = scriptId;
      script.src = src;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => {
        // Let a later attempt retry instead of caching the failure forever.
        delete sdkLoads[scriptId];
        script.remove();
        reject(new Error(`Failed to load ${src}`));
      };
      document.head.appendChild(script);
    });

    return sdkLoads[scriptId];
  }
}
