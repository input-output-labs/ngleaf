import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, forkJoin, take } from 'rxjs';

import { LeafAccountModel, OAuthIdentityModel, OAuthProvider } from '../../../../../api/models/index';
import { LeafSessionService } from '../../../../../services/index';
import { selectCurrentAccountData } from '../../../../../store/core/session/session.selectors';
import { LeafSocialCredential } from '../../../social-login/index';

@Component({
  standalone: false,
  selector: 'leaf-account-settings-connected-accounts',
  templateUrl: './account-settings-connected-accounts.component.html',
  styleUrls: ['./account-settings-connected-accounts.component.scss'],
})
export class AccountSettingsConnectedAccountsComponent implements OnInit {
  public currentAccount$: Observable<LeafAccountModel>;

  public identities: OAuthIdentityModel[] = [];
  public availableProviders: OAuthProvider[] = [];
  public loading = true;
  public pending = false;
  /** Translation key of the error to display, null when everything went fine. */
  public errorKey: string = null;

  constructor(
    private store: Store,
    private sessionService: LeafSessionService
  ) {
    this.currentAccount$ = this.store.select(selectCurrentAccountData);
  }

  ngOnInit() {
    this.refresh();
  }

  public get linkableProviders(): OAuthProvider[] {
    return this.availableProviders.filter((provider) => !this.isLinked(provider));
  }

  public isLinked(provider: OAuthProvider): boolean {
    return this.identities.some((identity) => identity.provider === provider);
  }

  /**
   * Removing the last identity of an account that never had a password would
   * lock the user out, so the back-end refuses it: do not even offer it.
   */
  public canUnlink(account: LeafAccountModel): boolean {
    const passwordless = !!account?.authentication?.passwordless;
    return !passwordless || this.identities.length > 1;
  }

  public onCredential(credential: LeafSocialCredential) {
    this.errorKey = null;
    this.pending = true;
    this.sessionService
      .linkOAuthProvider(credential.provider, credential.idToken, {
        name: credential.name,
        firstname: credential.firstname,
        lastname: credential.lastname,
      })
      .pipe(take(1))
      .subscribe({
        next: (identities) => {
          this.identities = identities || [];
          this.pending = false;
          // Linking may have completed the profile server side.
          this.sessionService.refreshAccount();
        },
        error: () => {
          this.pending = false;
          this.errorKey = 'leaf.connected-accounts.linkError';
        },
      });
  }

  public unlink(provider: OAuthProvider) {
    this.errorKey = null;
    this.pending = true;
    this.sessionService
      .unlinkOAuthProvider(provider)
      .pipe(take(1))
      .subscribe({
        next: (identities) => {
          this.identities = identities || [];
          this.pending = false;
        },
        error: () => {
          this.pending = false;
          this.errorKey = 'leaf.connected-accounts.unlinkError';
        },
      });
  }

  private refresh() {
    this.loading = true;
    forkJoin({
      identities: this.sessionService.listOAuthIdentities().pipe(take(1)),
      providers: this.sessionService.listOAuthProviders().pipe(take(1)),
    })
      .pipe(take(1))
      .subscribe({
        next: ({ identities, providers }) => {
          this.identities = identities || [];
          this.availableProviders = providers || [];
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.errorKey = 'leaf.connected-accounts.loadError';
        },
      });
  }
}
