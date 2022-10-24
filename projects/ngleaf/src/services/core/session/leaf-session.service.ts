import { Inject, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, map, take } from 'rxjs';

import { LeafAuthHttpClient, AccountApiClient } from '../../../api/clients/index';

import { LeafConfig } from '../../../models/index';
import { LeafNotificationService } from '../notification/leaf-notification.service';
import { LeafConfigServiceToken } from '../../leaf-config.module';
import { resetCurrentAccount, resetSessionToken, selectCurrentAccount, selectSessionToken, selectUpdatePassword, setCurrentAccountCall, setMailingsUnsubscriptionCall, setResetPasswordCall, setSendResetPasswordKeyCall, setSessionToken, setSessionTokenCall, setUpdatePasswordCall } from '../../../store/core/session/index';
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
      this.store.pipe(
        select(selectCurrentAccount),
        filter((currentAccount: AsyncType<LeafAccountModel>) => !currentAccount.status.pending && !!currentAccount.data),
        map((currentAccount: AsyncType<LeafAccountModel>) => currentAccount.status),
        take(1)
      ).subscribe((status) => {
        if(status.success) {
          resolve();
        }
        if(status.failure) {
          reject();
        }
      });
    });

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
      this.router.navigate([returnTo]);
    });

    this.store.pipe(
      select(selectCurrentAccount),
      filter((currentAccount: AsyncType<LeafAccountModel>) => !currentAccount.status.pending && (!!currentAccount.data || !!currentAccount.error)),
      map((currentAccount: AsyncType<LeafAccountModel>) => currentAccount.status),
      take(1)
    ).subscribe((status) => {
      if(status.success) {
        this.notificationService.emit({
          id: 'registerSuccess',
          category: 'session',
          message: 'Registration was successful.'
        });
      }
      if(status.failure) {
        this.notificationService.emit({
          id: 'registerFailed',
          category: 'session',
          message: 'Register failed.'
        });
      }
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
      this.router.navigate([returnTo]);
    });

    this.store.pipe(
      select(selectCurrentAccount),
      filter((currentAccount: AsyncType<LeafAccountModel>) => !currentAccount.status.pending && (!!currentAccount.data || !!currentAccount.error)),
      map((currentAccount: AsyncType<LeafAccountModel>) => currentAccount.status),
      take(1)
    ).subscribe((status) => {
      if(status.success) {
        this.notificationService.emit({
          id: 'loginSuccess',
          category: 'session',
          message: 'Login was successful.'
        });
      }
      if(status.failure) {
        this.notificationService.emit({
          id: 'loginFailed',
          category: 'session',
          message: 'Login failed.'
        });
      }
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

  public changePassword(oldPassword, newPassword) {
    const passwordChanging = {
      oldPassword,
      newPassword
    };

    this.store.dispatch(setUpdatePasswordCall({
      call: this.accountApiClient.changePassword(passwordChanging)
    }));

    this.store.pipe(
      select(selectUpdatePassword),
      filter((updatePassword: AsyncType<LeafAccountModel>) => !updatePassword.status.pending && !!updatePassword.data),
      map((updatePassword: AsyncType<LeafAccountModel>) => updatePassword.status),
      take(1)
    ).subscribe((status) => {
      if(status.success) {
        this.notificationService.emit({
          id: 'successChangePassword',
          category: 'session',
          message: 'password changed'
        });
      }
      if(status.failure) {
        this.notificationService.emit({
          id: 'failureChangePassword',
          category: 'session',
          message: 'password changed failed'
        });
      }
    });
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
