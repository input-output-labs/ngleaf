import { Inject, Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { LeafAccountModel } from '../models/leaf-account.model';

import { LeafAuthHttpClient } from './leaf-auth-http-client.service';
import { LeafNotificationService } from './leaf-notification.service';
import { LeafConfigServiceToken } from './leaf-config.module';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LeafSessionService {
  public currentAccount$: ReplaySubject<LeafAccountModel> = new ReplaySubject(1);
  public currentAccount = null;
  public jwtoken: string = null;
  public currentSessionToken$: ReplaySubject<string> = new ReplaySubject(1);

  constructor(
    @Inject(LeafConfigServiceToken) private config,
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
          this.currentAccount$.next(null);
          this.currentSessionToken$.next(null);
          this.authHttp.setJwtoken(null);
        });
    } else {
      this.currentAccount$.next(null);
      this.currentSessionToken$.next(null);
    }
  }

  public refreshAccount() {
    return new Promise((resolve, reject) => {
      this.authHttp
        .get<LeafAccountModel>(this.config.serverUrl + '/account/me')
        .subscribe(currentAccount => {
          this.currentAccount$.next(currentAccount);
          this.currentAccount = currentAccount;
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
        this.currentAccount$.next(null);
        this.authHttp.setJwtoken(null);
      });
  }

  public register(email, password) {
    return new Promise((resolve, reject) => {
      const account = {
        email,
        password
      };
      // TODO: REMOVE ANY
      this.authHttp
        .post<any>(this.config.serverUrl + '/account', account)
        .subscribe(
          jwt => {
            this.saveTokenAndGetAccount(jwt.token);
            resolve();
          },
          () => {
            this.notificationService.emit({
              id: 'registerFailed',
              category: 'session',
              message: 'register failed'
            });
          }
        );
    });
  }

  public login(email, password) {
    return new Promise(resolve => {
      const credentials = {
        email,
        password
      };
      // TODO: REMOVE ANY

      this.authHttp
        .post<any>(this.config.serverUrl + '/account/login', credentials)
        .subscribe(
          jwt => {
            this.saveTokenAndGetAccount(jwt.token);
            const returnTo =
              this.activeRoute.snapshot.queryParams.return || '/';
            this.router.navigate([returnTo]);
            resolve();
          },
          () => {
            this.notificationService.emit({
              id: 'loginFailed',
              category: 'session',
              message: 'login failed'
            });
          }
        );
    });
  }

  public logout() {
    return new Promise(resolve => {
      localStorage.setItem('jwtoken', null);
      this.jwtoken = null;
      this.currentSessionToken$.next(null);
      this.authHttp.setJwtoken(null);
      this.currentAccount$.next(null);
      this.currentAccount = null;
      this.router.navigate(['/']);
      resolve();
    });
  }

  public changeUsername(username) {
    return new Promise(() => {
      // TODO: REMOVE ANY
      this.authHttp
        .post<any>(this.config.serverUrl + '/account/me/username', username)
        .subscribe(
          () => {
            this.refreshAccount();
            this.notificationService.emit({
              id: 'successChangeUsername',
              category: 'session',
              message: 'name changed'
            });
          },
          () => {
            this.notificationService.emit({
              id: 'failureChangeUsername',
              category: 'session',
              message: 'name changed failed'
            });
          }
        );
    });
  }

  public addPrivateToken(name, expiration) {
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
              message: 'private token added'
            });
            resolve(jwt.token);
          },
          () => {
            this.notificationService.emit({
              id: 'failureAddPrivateToken',
              category: 'session',
              message: 'private token addition failed'
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

  public changeAvatar(avatar) {
    return new Promise(() => {
      // TODO: REMOVE ANY
      this.authHttp
        .post<any>(this.config.serverUrl + '/accout/me/avatar', avatar)
        .subscribe(
          () => {
            this.refreshAccount();
            this.notificationService.emit({
              id: 'successChangeAvatar',
              category: 'session',
              message: 'avatar changed'
            });
          },
          () => {
            this.notificationService.emit({
              id: 'failureChangeAvatar',
              category: 'session',
              message: 'avatar changed failed'
            });
          }
        );
    });
  }

  public changePassword(oldPassword, newPassword) {
    return new Promise((resolve, reject) => {
      const passwordChanging = {
        oldPassword,
        newPassword
      };
      // TODO: REMOVE ANY
      this.authHttp
        .post<any>(
          this.config.serverUrl + '/account/me/password',
          passwordChanging
        )
        .subscribe(
          () => {
            this.refreshAccount();
            this.notificationService.emit({
              id: 'successChangePassword',
              category: 'session',
              message: 'password changed'
            });
          },
          () => {
            this.notificationService.emit({
              id: 'failureChangePassword',
              category: 'session',
              message: 'password changed failed'
            });
          }
        );
    });
  }

  public sendResetPasswordKey(email) {
    // TODO: REMOVE ANY
    return this.authHttp
      .post<any>(this.config.serverUrl + '/account/sendresetpasswordkey', email)
      .toPromise();
  }

  public resetPassword(key, password) {
    const passwordResetting = {
      key,
      password
    };
    // TODO: REMOVE ANY
    return this.authHttp
      .post<any>(
        this.config.serverUrl + '/account/resetPassword',
        passwordResetting
      )
      .toPromise();
  }
}
