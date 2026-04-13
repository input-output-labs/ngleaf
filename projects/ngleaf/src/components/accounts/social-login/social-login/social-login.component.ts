import { Component, EventEmitter, Inject, Input, NgZone, OnDestroy, OnInit, AfterViewChecked, AfterViewInit, Output } from '@angular/core';
import { LeafConfig } from '../../../../models/index';
import { LeafConfigServiceToken } from '../../../../services/leaf-config.module';
import { LeafSessionService } from '../../../../services/index';

declare var google: any;
declare var AppleID: any;

@Component({
  standalone: false,
  selector: 'leaf-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss'],
})
export class LeafSocialLoginComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  @Input() public skipRedirect: boolean = false;
  @Input() public showGoogle: boolean = true;
  @Input() public showApple: boolean = true;

  @Output() public onSuccess = new EventEmitter<void>();
  @Output() public onFailure = new EventEmitter<{ provider: string; error: any }>();

  public googleEnabled = false;
  public appleEnabled = false;

  private googleButtonId = 'leaf-google-signin-btn-' + Math.random().toString(36).substring(2, 9);
  private appleSignInSuccessHandler = this.onAppleSignInOnSuccess.bind(this);
  private appleSignInFailureHandler = this.onAppleSignInOnFailure.bind(this);
  private appleButtonInitialized = false;
  private appleListenersAttached = false;

  constructor(
    @Inject(LeafConfigServiceToken) private config: LeafConfig,
    private sessionService: LeafSessionService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    if (this.config.oauth?.google?.clientId && this.showGoogle) {
      this.googleEnabled = true;
      this.loadGoogleSdk();
    }
    if (this.config.oauth?.apple?.clientId && this.showApple) {
      this.appleEnabled = true;
      this.loadAppleSdk();
    }
  }

  ngAfterViewInit() {
    if (this.googleEnabled && typeof google !== 'undefined' && google.accounts) {
      this.initGoogleSignIn();
    }
    if (this.appleEnabled && typeof AppleID !== 'undefined' && AppleID.auth) {
      this.initAppleSignIn();
    }
  }

  ngAfterViewChecked() {
    if (this.appleEnabled && !this.appleButtonInitialized && typeof AppleID !== 'undefined' && AppleID.auth) {
      this.initAppleSignIn();
    }
  }

  ngOnDestroy() {
    if (this.appleListenersAttached) {
      document.removeEventListener('AppleIDSignInOnSuccess', this.appleSignInSuccessHandler);
      document.removeEventListener('AppleIDSignInOnFailure', this.appleSignInFailureHandler);
    }
  }

  public getGoogleButtonId(): string {
    return this.googleButtonId;
  }

  private loadGoogleSdk() {
    const existingScript = document.getElementById('leaf-google-gsi-script') as HTMLScriptElement;
    if (existingScript) {
      if (typeof google !== 'undefined' && google.accounts) {
        return;
      }
      existingScript.addEventListener('load', () => this.initGoogleSignIn(), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.id = 'leaf-google-gsi-script';
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => this.initGoogleSignIn();
    document.head.appendChild(script);
  }

  private initGoogleSignIn() {
    if (typeof google === 'undefined' || !google.accounts) {
      return;
    }
    google.accounts.id.initialize({
      client_id: this.config.oauth.google.clientId,
      callback: (response: any) => {
        this.ngZone.run(() => {
          debugger;
          this.sessionService.loginWithOAuth('google', response.credential, {
            onSuccess: () => this.onSuccess.emit(),
            onFailure: () => this.onFailure.emit({ provider: 'google', error: 'login_failed' }),
            skipRedirect: this.skipRedirect,
          });
        });
      },
    });

    const buttonElement = document.getElementById(this.googleButtonId);
    if (buttonElement) {
      google.accounts.id.renderButton(buttonElement, {
        type: 'icon', // 'icon', 'standard'
        theme: 'outline', // 'filled_blue', 'filled_black'
        size: 'large', // 'small', 'medium', 'large'
      });
    }
  }

  private loadAppleSdk() {
    const existingScript = document.getElementById('leaf-apple-signin-script') as HTMLScriptElement;
    if (existingScript) {
      if (typeof AppleID !== 'undefined' && AppleID.auth) {
        return;
      }
      existingScript.addEventListener('load', () => this.initAppleSignIn(), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.id = 'leaf-apple-signin-script';
    script.src = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/fr_FR/appleid.auth.js';
    script.async = true;
    script.defer = true;
    script.onload = () => this.initAppleSignIn();
    document.head.appendChild(script);
  }

  private initAppleSignIn() {
    if (typeof AppleID === 'undefined' || !AppleID.auth) {
      return;
    }

    const buttonElement = document.getElementById('appleid-signin');
    if (!buttonElement) {
      return;
    }

    AppleID.auth.init({
      clientId: this.config.oauth.apple.clientId,
      scope: 'name email',
      redirectURI: window.location.origin,
      usePopup: true,
    });

    if (!this.appleListenersAttached) {
      document.addEventListener('AppleIDSignInOnSuccess', this.appleSignInSuccessHandler);
      document.addEventListener('AppleIDSignInOnFailure', this.appleSignInFailureHandler);
      this.appleListenersAttached = true;
    }

    if (typeof AppleID.auth.renderButton === 'function') {
      buttonElement.innerHTML = '';
      setTimeout(() =>  AppleID.auth.renderButton({ id: 'appleid-signin' }), 1);
    }

    this.appleButtonInitialized = true;
  }

  private onAppleSignInOnSuccess(event) {
    const { state, code, id_token } = event.detail.authorization;
    const { email, name } = event.detail.user;
    this.ngZone.run(() => {
      debugger;
      const fullName = name
        ? `${name.firstName || ''} ${name.lastName || ''}`.trim()
        : undefined;
      this.sessionService.loginWithOAuth('apple', id_token, {
        name: fullName || undefined,
        onSuccess: () => this.onSuccess.emit(),
        onFailure: () => this.onFailure.emit({ provider: 'apple', error: 'login_failed' }),
        skipRedirect: this.skipRedirect,
      });
    });
  }

  private onAppleSignInOnFailure(event) {
    const { error } = event.detail;
    debugger;
    this.onFailure.emit({ provider: 'apple', error });
  }
}
