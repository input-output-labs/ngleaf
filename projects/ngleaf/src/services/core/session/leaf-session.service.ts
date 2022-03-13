import { Inject, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, map, take } from 'rxjs';

import { LeafAuthHttpClient, AccountApiClient } from '../../../api/clients/index';

import { LeafConfig } from '../../../models/index';
import { LeafNotificationService } from '../notification/leaf-notification.service';
import { LeafConfigServiceToken } from '../../leaf-config.module';
import { resetCurrentAccount, resetSessionToken, selectCurrentAccount, selectSessionToken, setCurrentAccountCall, setResetPasswordCall, setSendResetPasswordKeyCall, setSessionToken, setSessionTokenCall } from '../../../store/core/session/index';
import { AsyncType } from '../../../store/common/index';
import { JWTModel, LeafAccountModel } from '../../../api/models/index';

@Injectable()
export class LeafSessionService {

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
    const jwtoken = localStorage.getItem('jwtoken');
    if (jwtoken) {
      this.store.dispatch(setSessionToken({sessionToken: {token: jwtoken}}));
    } else {
      this.store.dispatch(resetSessionToken());
    }

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
    ).subscribe((jwtoken) => {
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
        });

      } else {
        localStorage.removeItem('jwtoken');
        this.authHttp.setJwtoken(null);
      }
    });
  }

  public refreshAccount(): Promise<void> {
    const call = this.accountApiClient.me();
    this.store.dispatch(setCurrentAccountCall({call}));
    return new Promise((resolve, reject) => {
      call.subscribe({
        next: () => resolve(),
        error: () => reject()
      });
    });
  }

  public register(email, password): Promise<void> {
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
      this.router.navigate([returnTo]);
    });

    return new Promise((resolve, reject) => {
      call.subscribe({
        next: (jwt) => {
          // this.saveTokenAndGetAccount(jwt.token);
          this.notificationService.emit({
            id: 'registerSuccess',
            category: 'session',
            message: 'Registration was successful.'
          });
          resolve();
        },
        error: () => {
          this.notificationService.emit({
            id: 'registerFailed',
            category: 'session',
            message: 'Register failed.'
          });
          reject();
        }
      });
    });
  }

  public login(email, password): Promise<void> {
    const credentials = {
      email,
      password
    };

    const call = this.accountApiClient.login(credentials);
    this.store.dispatch(setSessionTokenCall({call}));

    this.store.pipe(
      select(selectCurrentAccount),
      filter((currentAccount: AsyncType<LeafAccountModel>) => !currentAccount.status.pending && !!currentAccount.data),
      take(1)
    ).subscribe(() => {
      const returnTo = this.activeRoute.snapshot.queryParams.return || this.config.navigation.loginSuccessRedirect || '/';
      this.router.navigate([returnTo]);
    });

    return new Promise((resolve, reject) => {
      call.subscribe({
        next: (jwt) => {
          // this.saveTokenAndGetAccount(jwt.token);

            this.notificationService.emit({
              id: 'loginSuccess',
              category: 'session',
              message: 'Login was successful.'
            });
            resolve();
        },
        error: () => {
          () => {
            this.notificationService.emit({
              id: 'loginFailed',
              category: 'session',
              message: 'Login failed.'
            });
            reject();
          }
        },
      });
    });
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
    const call = this.accountApiClient.sendPasswordKey(email);
    this.store.dispatch(setSendResetPasswordKeyCall({call}));

    call.subscribe({
      next: () => {
        this.notificationService.emit({
          id: 'sendResetPasswordSucceed',
          category: 'session',
          message: 'Sending the password reset was successful.'
        });
      },
      error: () => {
        this.notificationService.emit({
          id: 'sendResetPasswordFailed',
          category: 'session',
          message: 'An error occurred while trying to reset the password. No change key sent.'
        });
      }
    });
  }

  public resetPassword(key, password) {
    const passwordResetting = {
      key,
      password
    };
    const call = this.accountApiClient.resetPassword(passwordResetting);
    this.store.dispatch(setResetPasswordCall({call}));

    call.subscribe({
      next: () => {
        this.notificationService.emit({
          id: 'changePasswordSuccess',
          category: 'session',
          message: 'Password changed successfully.'
        });
      },
      error: () => {
        this.notificationService.emit({
          id: 'changePasswordFailed',
          category: 'session',
          message: 'An error occurred while trying to change the password.'
        });
      }
    });
  }
}
