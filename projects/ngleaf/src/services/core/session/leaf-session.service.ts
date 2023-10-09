import { Inject, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, map, skip, take, tap } from 'rxjs';

import { LeafAuthHttpClient, AccountApiClient, SponsoringApiClientService } from '../../../api/clients/index';

import { LeafConfig } from '../../../models/index';
import { LeafConfigServiceToken } from '../../leaf-config.module';
import { initializationDone, resetCurrentAccount, resetSessionToken, selectCurrentAccount, selectSessionState, selectSessionToken, setCurrentAccountCall, setMailingsUnsubscriptionCall, setResetPasswordCall, setSendResetPasswordKeyCall, setSessionToken, setSessionTokenCall, setUpdatePasswordCall } from '../../../store/core/session/index';
import { AsyncType } from '../../../store/common/index';
import { JWTModel, LeafAccountModel } from '../../../api/models/index';
import { selectSponsorCode, setSetSponsorCall, setSponsorCode } from '../../../store/sponsoring/index';
import { Actions, ofType } from '@ngrx/effects';

@Injectable()
export class LeafSessionService {

  constructor(
    @Inject(LeafConfigServiceToken) public config: LeafConfig,
    private accountApiClient: AccountApiClient,
    private sponsoringApiClientService: SponsoringApiClientService,
    private store: Store,
    private actions$: Actions,
    public authHttp: LeafAuthHttpClient,
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) {}

  public init() {
    const jwtoken = localStorage.getItem('jwtoken');
    if (jwtoken) {
      this.store.dispatch(setSessionToken({sessionToken: {token: jwtoken}}));
    } else {
      this.store.dispatch(resetSessionToken());
    }

    setTimeout(() => {
      this.checkSessionToken();
    });
  }

  public checkSessionToken() {
    this.store.pipe(
      select(selectSessionToken),
      filter<AsyncType<JWTModel>>((sessionToken) => !sessionToken.status.pending),
      map((sessionToken) => {
        if (sessionToken.status.success) {
          return sessionToken.data;
        } else {
          return null;
        }
      })
    ).subscribe((jwtoken: JWTModel) => {
      if (jwtoken) {
        localStorage.setItem('jwtoken', jwtoken.token);
        this.authHttp.setJwtoken(jwtoken.token);

        this.refreshAccount()
        .then(() => {})
        .catch(() => {
          this.store.dispatch(resetSessionToken());
          this.store.dispatch(resetCurrentAccount());

          if (this.config.navigation.authGuardErrorRedirect) {
            this.router.navigate([this.config.navigation.authGuardErrorRedirect]);
          }
        })
        .finally(() => {
          this.store.dispatch(initializationDone());
        });

      } else {
        localStorage.removeItem('jwtoken');
        this.authHttp.setJwtoken(null);
        this.store.dispatch(initializationDone());
      }
    });
  }

  public refreshAccount(): Promise<void> {
    const call = this.accountApiClient.me();
    this.store.dispatch(setCurrentAccountCall({call}));

    return new Promise((resolve, reject) => {
      this.store.pipe(
        select(selectCurrentAccount),
        filter((currentAccount: AsyncType<LeafAccountModel>) => !currentAccount.status.pending),
        take(1)
      ).subscribe((currentAccountAsync) => {
        if(currentAccountAsync.status.success) {
          resolve();
        }
        if(currentAccountAsync.status.failure) {
          reject();
        }
      });
    });

  }

  private addSponsorIfPossible() {
    if (this.config.featureActivation?.sponsoring) {
      this.store.pipe(
        select(selectSponsorCode),
        take(1)
      ).subscribe((sponsorCode?: string) => {
        if (sponsorCode) {
          this.store.dispatch(setSetSponsorCall({
            call: this.sponsoringApiClientService.setSponsor(sponsorCode)
          }));
          this.store.dispatch(setSponsorCode({sponsorCode: undefined}));
        }
      });
    }
  }

  public register(email, password) {
    const account = {
      email,
      password
    };

    const call = this.accountApiClient.register(account);
    this.store.dispatch(setSessionTokenCall({call}));

    this.store.pipe(
      select(selectCurrentAccount),
      filter((currentAccount: AsyncType<LeafAccountModel>) => !currentAccount.status.pending && !!currentAccount.data),
      take(1)
    ).subscribe(() => {
      const returnTo = this.activeRoute.snapshot.queryParams.return || this.config.navigation.registerSuccessRedirect || '/';
      this.addSponsorIfPossible();
      this.returnTo(returnTo);
    });
  }

  public login(email, password) {
    const credentials = {
      email,
      password
    };

    this.store.dispatch(setSessionTokenCall({
      call: this.accountApiClient.login(credentials)
    }));

    this.store.pipe(
      select(selectCurrentAccount),
      filter((currentAccount: AsyncType<LeafAccountModel>) => !currentAccount.status.pending && !!currentAccount.data),
      take(1)
    ).subscribe(() => {
      const returnTo = this.activeRoute.snapshot.queryParams.return || this.config.navigation.loginSuccessRedirect || '/';
      this.returnTo(returnTo);
    });
  }

  private returnTo(returnTo: string) {
    const url = new URL('https://fake.com' + decodeURIComponent(returnTo));
    const queryParams = {};
    for (const key of (url.searchParams as any).keys()) {
      queryParams[key] = url.searchParams.get(key);
    }

    this.router.navigate([url.pathname], { queryParams });
  }

  public logout(): Promise<void> {
    return new Promise(resolve => {
      this.store.dispatch(resetCurrentAccount());
      this.store.dispatch(resetSessionToken());
      const navigateTo = this.config.navigation.logoutRedirect || '/';
      this.router.navigate([navigateTo]);
      resolve();
    });
  }

  public changeUsername(username): Promise<void> {
    return new Promise((resolve, reject) => {
      // TODO: REMOVE ANY
      this.accountApiClient.changeUsername(username)
        .subscribe(
          () => {
            this.refreshAccount();
            resolve();
          },
          () => {
            reject();
          }
        );
    });
  }

  public addPrivateToken(name, expiration): Promise<string> {
    const privateToken = { name, expiration };
    return new Promise<string>((resolve) => {
      this.authHttp
        .post<any>(
          this.config.serverUrl + '/account/me/privatetokens',
          privateToken
        )
        .subscribe(
          (jwt) => {
            this.refreshAccount();
            resolve(jwt.token);
          },
          () => {}
        );
    });
  }

  public revokePrivateToken(name) {
    this.authHttp
      .delete<any>(
        this.config.serverUrl + '/account/me/privatetokens/' + name
      )
      .subscribe(
        () => {
          this.refreshAccount();
        },
        () => {}
      );
  }

  public changeAvatar(avatar): Promise<void> {
    return new Promise((resolve, reject) => {
      // TODO: REMOVE ANY
      this.accountApiClient.changeAvatar(avatar)
        .subscribe(
          () => {
            this.refreshAccount();
            resolve();
          },
          () => {
            reject();
          }
        );
    });
  }

  public changePassword(oldPassword, newPassword) {
    const passwordChanging = {
      oldPassword,
      newPassword
    };

    this.store.dispatch(setUpdatePasswordCall({
      call: this.accountApiClient.changePassword(passwordChanging)
    }));
  }

  public sendResetPasswordKey(email) {
    const call = this.accountApiClient.sendPasswordKey(email);
    this.store.dispatch(setSendResetPasswordKeyCall({call}));
  }

  public resetPassword(key, password) {
    const passwordResetting = {
      key,
      password
    };
    const call = this.accountApiClient.resetPassword(passwordResetting);
    this.store.dispatch(setResetPasswordCall({call}));
  }

  public unsubscribeFromEmail(email: string, type: string) {
    const unsubscription = {
      email,
      type
    };
    const call = this.accountApiClient.unsubscribeFromEmail(unsubscription);
    this.store.dispatch(setMailingsUnsubscriptionCall({call}));
  }
}
