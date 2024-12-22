import { Inject, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, ReplaySubject, Subject, filter, map, shareReplay, take } from 'rxjs';

import { LeafAuthHttpClient, AccountApiClient, SponsoringApiClientService } from '../../../api/clients/index';

import { LeafConfig } from '../../../models/index';
import { LeafConfigServiceToken } from '../../leaf-config.module';
import { initializationDone, resetCurrentAccount, resetSessionToken, selectCurrentAccount, selectSessionToken, setCurrentAccountCall, setMailingsUnsubscriptionCall, setResetPasswordCall, setSendResetPasswordKeyCall, setSessionToken, setSessionTokenCall, setUpdatePasswordCall } from '../../../store/core/session/index';
import { fetchNotificationsCall } from '../../../store/core/notifications/notifications.actions';
import { listMyOrganizationsCall } from '../../../store/core/organizations/organizations.actions';
import { fetchEligibilitesCall } from '../../../store/core/eligibilities/eligibilities.actions';
import { AsyncType } from '../../../store/common/index';
import { JWTModel, LeafAccountModel, LeafEligibilities, LeafNotificationModel, LeafOrganization, LeafSetupResponse } from '../../../api/models/index';
import { selectSponsorCode, setSetSponsorCall, setSponsorCode } from '../../../store/sponsoring/index';

@Injectable()
export class LeafSessionService {

  constructor(
    @Inject(LeafConfigServiceToken) public config: LeafConfig,
    private accountApiClient: AccountApiClient,
    private sponsoringApiClientService: SponsoringApiClientService,
    private store: Store,
    public authHttp: LeafAuthHttpClient,
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) {}

  public init() {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("l_tkn")) {
      localStorage.setItem('jwtoken', searchParams.get("l_tkn"));
    }

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

        this.setupAccountInfo()
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

  public setupAccountInfo(): Promise<void> {
    const setupConfig = this.config.setupConfig;

    const call$: Observable<LeafSetupResponse> = this.accountApiClient.setup(setupConfig).pipe(shareReplay());

    const accountCall$: Observable<LeafAccountModel> = call$.pipe(map((setupResponse) => setupResponse.user));
    this.store.dispatch(setCurrentAccountCall({call: accountCall$}));

    if (setupConfig.notifications) {
      const notificationsCall$: Observable<LeafNotificationModel[]> = call$.pipe(map((setupResponse) => setupResponse.notifications));
      this.store.dispatch(fetchNotificationsCall({call: notificationsCall$}));
    }

    if (setupConfig.organizations) {
      const organizationsCall$: Observable<LeafOrganization[]> = call$.pipe(map((setupResponse) => setupResponse.organizations));
      this.store.dispatch(listMyOrganizationsCall({call: organizationsCall$}));
    }

    if (setupConfig.eligibilities) {
      const eligibilitiesCall$: Observable<LeafEligibilities> = call$.pipe(map((setupResponse) => setupResponse.eligibilities));
      this.store.dispatch(fetchEligibilitesCall({call: eligibilitiesCall$}));
    }

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

  public refreshAccount() {
    const call = this.accountApiClient.me();
    this.store.dispatch(setCurrentAccountCall({call}));
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

  public registerTemporaryAccount() {
    const account = {
      isTemporary: true,
    };

    const call = this.accountApiClient.register(account);
    this.store.dispatch(setSessionTokenCall({ call }));
  }

  public register(email, password, options?: {onSuccess?: () => void, onFailure?: () => void, skipRedirect?: boolean}) {
    const account = {
      email,
      password
    };

    const call = this.accountApiClient.register(account);
    this.store.dispatch(setSessionTokenCall({call}));

    if (!options || !options.skipRedirect) {
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
    
    if (options && (options.onSuccess || options.onFailure)) {
      this.store
        .pipe(
          select(selectSessionToken),
          filter((sessionToken) => !sessionToken.status.pending),
          map((sessionToken) => sessionToken.status),
          take(1)
        )
        .subscribe((status) => {
          if (options.onSuccess && status.success) {
            options.onSuccess();
          }
          if (options.onFailure && status.failure) {
            options.onFailure();
          }
        });
    }
  }

  public login(email, password, options?: {onSuccess?: () => void, onFailure?: () => void, skipRedirect?: boolean}) {
    const credentials = {
      email,
      password
    };

    this.store.dispatch(setSessionTokenCall({
      call: this.accountApiClient.login(credentials)
    }));

    if (!options || !options.skipRedirect) {
      this.store.pipe(
        select(selectCurrentAccount),
        filter((currentAccount: AsyncType<LeafAccountModel>) => !currentAccount.status.pending && !!currentAccount.data),
        take(1)
      ).subscribe(() => {
        const returnTo = this.activeRoute.snapshot.queryParams.return || this.config.navigation.loginSuccessRedirect || '/';
        this.returnTo(returnTo);
      });
    }

    if (options && (options.onSuccess || options.onFailure)) {
      this.store.pipe(
        select(selectSessionToken),
        filter(sessionToken => !sessionToken.status.pending),
        map(sessionToken => sessionToken.status),
        take(1)
      ).subscribe((status) => {
        if (options.onSuccess && status.success) {
          options.onSuccess();
        }
        if (options.onFailure && status.failure) {
          options.onFailure();
        }
      });
    }
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
