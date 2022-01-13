import { Inject, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ReplaySubject } from 'rxjs';

import { LeafAuthHttpClient, AccountApiClient } from '../../../api/clients/index';

import { LeafConfig } from '../../../models/index';
import { LeafNotificationService } from '../notification/leaf-notification.service';
import { LeafConfigServiceToken } from '../../leaf-config.module';
import { setCurrentAccount, setSessionLoading } from '../../../store/core/session/session.actions';

@Injectable()
export class LeafSessionService {
  public jwtoken: string = null;
  public currentSessionToken$: ReplaySubject<string> = new ReplaySubject(1);

  constructor(
    @Inject(LeafConfigServiceToken) public config: LeafConfig,
    private accountApiClient: AccountApiClient,
    private store: Store,
    public authHttp: LeafAuthHttpClient,
    public notificationService: LeafNotificationService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  public init() {
    this.jwtoken = localStorage.getItem('jwtoken');
    if (this.jwtoken) {
      this.authHttp.setJwtoken(this.jwtoken);
      this.refreshAccount()
        .then(() => {
          this.currentSessionToken$.next(this.jwtoken);
        })
        .catch(() => {
          this.store.dispatch(setCurrentAccount({account: null}));
          this.currentSessionToken$.next(null);
          this.authHttp.setJwtoken(null);
        });
    } else {
      this.store.dispatch(setSessionLoading({isLoading: false}));
      this.store.dispatch(setCurrentAccount({account: null}));
      this.currentSessionToken$.next(null);
    }
  }

  public refreshAccount(): Promise<void> {
    this.store.dispatch(setSessionLoading({isLoading: true}));
    return new Promise((resolve, reject) => {
      this.accountApiClient.me()
        .subscribe(currentAccount => {
          this.store.dispatch(setCurrentAccount({account: currentAccount}));
          this.store.dispatch(setSessionLoading({isLoading: false}));
          resolve();
        }, reject);
    });
  }

  private saveTokenAndGetAccount(jwtoken: string) {
    this.jwtoken = jwtoken;
    this.currentSessionToken$.next(jwtoken);
    this.authHttp.setJwtoken(jwtoken);

    this.refreshAccount()
      .then(() => {
        localStorage.setItem('jwtoken', jwtoken);
      })
      .catch(() => {
        this.store.dispatch(setCurrentAccount({account: null}));
        this.authHttp.setJwtoken(null);
      });
  }

  public register(email, password): Promise<void> {
    return new Promise((resolve, reject) => {
      const account = {
        email,
        password
      };
      this.accountApiClient.register(account)
        .subscribe(
          jwt => {
            this.saveTokenAndGetAccount(jwt.token);
            const returnTo =
              this.activeRoute.snapshot.queryParams.return || this.config.navigation.registerSuccessRedirect || '/';
            this.router.navigate([returnTo]);
            resolve();
            this.notificationService.emit({
              id: 'registerSuccess',
              category: 'session',
              message: 'Registration was successful.'
            });
          },
          () => {
            this.notificationService.emit({
              id: 'registerFailed',
              category: 'session',
              message: 'Register failed.'
            });
          }
        );
    });
  }

  public login(email, password): Promise<void> {
    return new Promise(resolve => {
      const credentials = {
        email,
        password
      };
      // TODO: REMOVE ANY

      this.accountApiClient.login(credentials)
        .subscribe(
          jwt => {
            this.saveTokenAndGetAccount(jwt.token);
            const returnTo =
              this.activeRoute.snapshot.queryParams.return || this.config.navigation.loginSuccessRedirect || '/';
            this.router.navigate([returnTo]);
            resolve();
            this.notificationService.emit({
              id: 'loginSuccess',
              category: 'session',
              message: 'Login was successful.'
            });
          },
          () => {
            this.notificationService.emit({
              id: 'loginFailed',
              category: 'session',
              message: 'Login failed.'
            });
          }
        );
    });
  }

  public logout(): Promise<void> {
    return new Promise(resolve => {
      localStorage.removeItem('jwtoken');
      this.jwtoken = null;
      this.currentSessionToken$.next(null);
      this.authHttp.setJwtoken(null);
      this.store.dispatch(setCurrentAccount({account: null}));
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
            this.notificationService.emit({
              id: 'successChangeUsername',
              category: 'session',
              message: 'Name changed'
            });
            resolve();
          },
          () => {
            this.notificationService.emit({
              id: 'failureChangeUsername',
              category: 'session',
              message: 'Name changed failed'
            });
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
            this.notificationService.emit({
              id: 'successAddPrivateToken',
              category: 'session',
              message: 'Private token added'
            });
            resolve(jwt.token);
          },
          () => {
            this.notificationService.emit({
              id: 'failureAddPrivateToken',
              category: 'session',
              message: 'Private token addition failed'
            });
          }
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
          this.notificationService.emit({
            id: 'successRevokePrivateToken',
            category: 'session',
            message: 'private token revoked'
          });
        },
        () => {
          this.notificationService.emit({
            id: 'failureRevokePrivateToken',
            category: 'session',
            message: 'private token revokation failed'
          });
        }
      );
  }

  public changeAvatar(avatar): Promise<void> {
    return new Promise((resolve, reject) => {
      // TODO: REMOVE ANY
      this.accountApiClient.changeAvatar(avatar)
        .subscribe(
          () => {
            this.refreshAccount();
            this.notificationService.emit({
              id: 'successChangeAvatar',
              category: 'session',
              message: 'avatar changed'
            });
            resolve();
          },
          () => {
            this.notificationService.emit({
              id: 'failureChangeAvatar',
              category: 'session',
              message: 'avatar changed failed'
            });
            reject();
          }
        );
    });
  }

  public changePassword(oldPassword, newPassword): Promise<void> {
    return new Promise((resolve, reject) => {
      const passwordChanging = {
        oldPassword,
        newPassword
      };
      // TODO: REMOVE ANY
      this.accountApiClient.changePassword(passwordChanging)
        .subscribe(
          () => {
            this.refreshAccount();
            this.notificationService.emit({
              id: 'successChangePassword',
              category: 'session',
              message: 'password changed'
            });
            resolve();
          },
          () => {
            this.notificationService.emit({
              id: 'failureChangePassword',
              category: 'session',
              message: 'password changed failed'
            });
            reject();
          }
        );
    });
  }

  public sendResetPasswordKey(email) {
    return this.accountApiClient.sendPasswordKey(email)
      .toPromise();
  }

  public resetPassword(key, password) {
    const passwordResetting = {
      key,
      password
    };
    // TODO: REMOVE ANY
    return this.accountApiClient.resetPassword(passwordResetting).toPromise();
  }
}
