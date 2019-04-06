import { Inject, Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { LeafAccountModel } from '../models/leaf-account.model';

import { LeafAuthHttpClient } from './leaf-auth-http-client.service';
import { LeafNotificationService } from './leaf-notification.service';
import { LeafConfigServiceToken } from './leaf-config.module';

@Injectable({
  providedIn: 'root',
})
export class LeafSessionService {
  private url = '';

  public currentAccount$: ReplaySubject<LeafAccountModel> = new ReplaySubject(
    1
  );
  public currentAccount = null;
  public jwtoken: string = null;

  constructor(
    @Inject(LeafConfigServiceToken) private config,
    public authHttp: LeafAuthHttpClient,
    public notificationService: LeafNotificationService
  ) {}

  public init() {
    this.url = this.config.serverUrl + '/account';

    this.jwtoken = localStorage.getItem('jwtoken');
    if (this.jwtoken) {
      this.authHttp.setJwtoken(this.jwtoken);
      this.refreshAccount()
        .then(() => {})
        .catch(() => {
          this.currentAccount$.next(null);
          this.authHttp.setJwtoken(null);
        });
    } else {
      this.currentAccount$.next(null);
    }
  }

  public refreshAccount() {
    return new Promise((resolve, reject) => {
      this.authHttp
        .get<LeafAccountModel>(this.url + '/me')
        .subscribe(currentAccount => {
          this.currentAccount$.next(currentAccount);
          this.currentAccount = currentAccount;
          resolve();
        }, reject);
    });
  }

  private saveTokenAndGetAccount(jwtoken: string) {
    this.authHttp.setJwtoken(jwtoken);
    this.refreshAccount()
      .then(() => {
        localStorage.setItem('jwtoken', jwtoken);
      })
      .catch(() => {
        this.currentAccount$.next(null);
        this.authHttp.setJwtoken(null);
      });
  }

  public register(email, password) {
    return new Promise((resolve, reject) => {
      const account = {
        email,
        password,
      };
      // TODO: REMOVE ANY
      this.authHttp.post<any>(this.url, account).subscribe(
        jwt => {
          this.saveTokenAndGetAccount(jwt.token);
          resolve();
        },
        () => {
          this.notificationService.emit({
            id: 'registerFailed',
            category: 'session',
            message: 'register failed',
          });
        }
      );
    });
  }

  public login(email, password) {
    return new Promise(resolve => {
      const credentials = {
        email,
        password,
      };
      // TODO: REMOVE ANY
      this.authHttp.post<any>(this.url + '/login', credentials).subscribe(
        jwt => {
          this.saveTokenAndGetAccount(jwt.token);
          resolve();
        },
        () => {
          this.notificationService.emit({
            id: 'loginFailed',
            category: 'session',
            message: 'login failed',
          });
        }
      );
    });
  }

  public logout() {
    return new Promise(resolve => {
      localStorage.setItem('jwtoken', null);
      this.authHttp.setJwtoken(null);
      this.currentAccount$.next(null);
      this.currentAccount = null;
      resolve();
    });
  }

  public changeUsername(username) {
    return new Promise(() => {
      // TODO: REMOVE ANY
      this.authHttp.post<any>(this.url + '/me/username', username).subscribe(
        () => {
          this.refreshAccount();
          this.notificationService.emit({
            id: 'successChangeUsername',
            category: 'session',
            message: 'name changed',
          });
        },
        () => {
          this.notificationService.emit({
            id: 'failureChangeUsername',
            category: 'session',
            message: 'name changed failed',
          });
        }
      );
    });
  }

  public changeAvatar(avatar) {
    return new Promise(() => {
      // TODO: REMOVE ANY
      this.authHttp.post<any>(this.url + '/me/avatar', avatar).subscribe(
        () => {
          this.refreshAccount();
          this.notificationService.emit({
            id: 'successChangeAvatar',
            category: 'session',
            message: 'avatar changed',
          });
        },
        () => {
          this.notificationService.emit({
            id: 'failureChangeAvatar',
            category: 'session',
            message: 'avatar changed failed',
          });
        }
      );
    });
  }

  public changePassword(oldPassword, newPassword) {
    return new Promise((resolve, reject) => {
      const passwordChanging = {
        oldPassword,
        newPassword,
      };
      // TODO: REMOVE ANY
      this.authHttp
        .post<any>(this.url + '/me/password', passwordChanging)
        .subscribe(
          () => {
            this.refreshAccount();
            this.notificationService.emit({
              id: 'successChangePassword',
              category: 'session',
              message: 'password changed',
            });
          },
          () => {
            this.notificationService.emit({
              id: 'failureChangePassword',
              category: 'session',
              message: 'password changed failed',
            });
          }
        );
    });
  }

  public sendResetPasswordKey(email) {
    // TODO: REMOVE ANY
    return this.authHttp
      .post<any>(this.url + '/sendresetpasswordkey', email)
      .toPromise();
  }

  public resetPassword(key, password) {
    const passwordResetting = {
      key,
      password,
    };
    // TODO: REMOVE ANY
    return this.authHttp
      .post<any>(this.url + '/resetPassword', passwordResetting)
      .toPromise();
  }
}
