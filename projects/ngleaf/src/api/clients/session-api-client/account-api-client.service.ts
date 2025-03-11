import { Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

import { LeafAuthHttpClient } from '../auth-http-client/leaf-auth-http-client.service';
import { JWTModel, LeafAccountModel, LeafAccountProfile, LoginModel, PasswordChangingModel, PasswordResettingModel, RegistrationModel } from '../../models/index';

import { LeafApiClientConfig, LeafApiClientConfigServiceToken } from '../api-client-config.module';
import { HttpParams } from '@angular/common/http';
import { LeafSetupConfig } from '../../../models/leaf-config.model';
import { LeafSetupResponse } from '../../models/leaf-setup.model';

@Injectable()
export class AccountApiClient {
  public constructor(
    @Inject(LeafApiClientConfigServiceToken) public config: LeafApiClientConfig,
    public authHttp: LeafAuthHttpClient
  ) {}

  public setup(setupConfig: LeafSetupConfig): Observable<LeafSetupResponse> {
    return this.authHttp.get<LeafSetupResponse>(
      `${this.config.serverUrl}/setup?user=true&notifications=${setupConfig.notifications}&organizations=${setupConfig.organizations}&eligibilities=${setupConfig.eligibilities}`
    );
  }

  public me(): Observable<LeafAccountModel> {
    return this.authHttp.get<LeafAccountModel>(
      this.config.serverUrl + "/account/me"
    );
  }

  public register(registration: RegistrationModel): Observable<JWTModel> {
    return this.authHttp.post<JWTModel>(
      this.config.serverUrl + "/account",
      registration
    );
  }

  public login(login: LoginModel): Observable<JWTModel> {
    return this.authHttp.post<JWTModel>(
      this.config.serverUrl + "/account/login",
      login
    );
  }

  public updateProfile(
    updates: LeafAccountProfile
  ): Observable<LeafAccountModel> {
    return this.authHttp.post<LeafAccountModel>(
      this.config.serverUrl + "/account/me/profile",
      updates
    );
  }

  public changeUsername(newUsername: string): Observable<LeafAccountModel> {
    return this.authHttp.post<LeafAccountModel>(
      this.config.serverUrl + "/account/me/username",
      newUsername
    );
  }

  public changePassword(
    passwordChange: PasswordChangingModel
  ): Observable<LeafAccountModel> {
    return this.authHttp.post<LeafAccountModel>(
      this.config.serverUrl + "/account/me/password",
      passwordChange
    );
  }

  public sendPasswordKey(emailOfAccountToReset: string): Observable<void> {
    return this.authHttp.post<void>(
      this.config.serverUrl + "/account/sendresetpasswordkey",
      emailOfAccountToReset
    );
  }

  public resetPassword(
    passwordResetting: PasswordResettingModel
  ): Observable<void> {
    return this.authHttp.post<void>(
      this.config.serverUrl + "/account/resetPassword",
      passwordResetting
    );
  }

  public changeAvatar(newAvatarUrl: string): Observable<LeafAccountModel> {
    return this.authHttp.post<LeafAccountModel>(
      this.config.serverUrl + "/account/me/avatar",
      newAvatarUrl
    );
  }

  public autocomplete(input: string): Observable<LeafAccountModel[]> {
    const params = new HttpParams().set("input", input);
    return this.authHttp.get<LeafAccountModel[]>(
      this.config.serverUrl + "/account/autocomplete",
      { params }
    );
  }

  public unsubscribeFromEmail(unsubscription: { email: string; type: string }) {
    return this.authHttp.post<void>(
      this.config.serverUrl + "/account/mailings/unsubscription",
      unsubscription
    );
  }

  public checkIfEmailExists(email: string): Observable<boolean> {
    const params = new HttpParams().set("email", email);
    return this.authHttp
      .get<void>(`${this.config.serverUrl}/account/email`, { params })
      .pipe(
        map(() => true),
        catchError((error) => {
          if (error.status === 404) {
            return of(false);
          }
          throw error;
        })
      );
  }

  public sendEmailVerificationCode() {
    return this.authHttp.post<void>(
      this.config.serverUrl + "/account/me/verification/email/send",
      {}
    );
  }

  public validateEmailVerificationCode(code: string) {
    return this.authHttp.post<void>(
      this.config.serverUrl + "/account/me/verification",
      {
        type: "email",
        code
      }
    );
  }
}
