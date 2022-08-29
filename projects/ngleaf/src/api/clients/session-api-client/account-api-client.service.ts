import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LeafAuthHttpClient } from '../auth-http-client/leaf-auth-http-client.service';
import { JWTModel, LeafAccountModel, LeafUserModel, LoginModel, PasswordChangingModel, PasswordResettingModel, RegistrationModel } from '../../models/index';

import { LeafApiClientConfig, LeafApiClientConfigServiceToken } from '../api-client-config.module';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class AccountApiClient {
  public constructor(
    @Inject(LeafApiClientConfigServiceToken) public config: LeafApiClientConfig,
    public authHttp: LeafAuthHttpClient
    ) {}

  public me(): Observable<LeafAccountModel> {
    return this.authHttp.get<LeafAccountModel>(this.config.serverUrl + '/account/me');
  }

  public register(registration: RegistrationModel): Observable<JWTModel> {
    return this.authHttp.post<JWTModel>(this.config.serverUrl + '/account', registration);
  }

  public login(login: LoginModel): Observable<JWTModel> {
    return this.authHttp.post<JWTModel>(this.config.serverUrl + '/account/login', login);
  }

  public changeUsername(newUsername: string): Observable<LeafAccountModel> {
    return this.authHttp.post<LeafAccountModel>(this.config.serverUrl + '/account/me/username', newUsername);
  }

  public changePassword(passwordChange: PasswordChangingModel): Observable<LeafAccountModel> {
    return this.authHttp.post<LeafAccountModel>(this.config.serverUrl + '/account/me/password', passwordChange);
  }

  public sendPasswordKey(emailOfAccountToReset: string): Observable<void> {
    return this.authHttp.post<void>(this.config.serverUrl + '/account/sendresetpasswordkey', emailOfAccountToReset);
  }

  public resetPassword(passwordResetting: PasswordResettingModel): Observable<void> {
    return this.authHttp.post<void>(this.config.serverUrl + '/account/resetPassword', passwordResetting);
  }

  public changeAvatar(newAvatarUrl: string): Observable<LeafAccountModel> {
    return this.authHttp.post<LeafAccountModel>(this.config.serverUrl + '/account/me/avatar', newAvatarUrl);
  }

  public autocomplete(input: string): Observable<LeafUserModel[]> {
      const params = new HttpParams().set('input', input);
      return this.authHttp.get<LeafUserModel[]>(
          this.config.serverUrl + '/account/autocomplete',
          { params }
      );
  }

  public unsubscribeFromEmail(unsubscription: { email: string; type: string; }) {
    return this.authHttp.post<void>(this.config.serverUrl + '/account/mailings/unsubscription', unsubscription);
  }
}
