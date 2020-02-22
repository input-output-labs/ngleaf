import { Injectable, Inject } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { LeafAccountModel, LeafAuthorizedEmailModel } from '../models';
import { LeafConfigServiceToken } from './leaf-config.module';
import { LeafAuthHttpClient } from './leaf-auth-http-client.service';

@Injectable({
  providedIn: 'root',
})
export class LeafAdminService {
  public authorizedEmails$: ReplaySubject<LeafAuthorizedEmailModel[]> = new ReplaySubject(1);
  public administrators$: ReplaySubject<string[]> = new ReplaySubject(1);

  constructor(
    @Inject(LeafConfigServiceToken) private config,
    public authHttp: LeafAuthHttpClient
  ) {}

  public fetchAuthorizedEmail() {
    this.authHttp
      .get<LeafAuthorizedEmailModel[]>(this.config.serverUrl + '/admin/authorizedemails')
      .subscribe((emails: LeafAuthorizedEmailModel[]) => {
        this.authorizedEmails$.next(emails);
      });
  }

  public addAuthorizedEmail(emails: string[]) {
    this.authHttp
      .post<LeafAuthorizedEmailModel>(this.config.serverUrl + '/admin/authorizedemails', emails)
      .subscribe(() => this.fetchAuthorizedEmail());
  }

  public removeAuthorizedEmail(emails: string[]) {
    this.authHttp
      .post<LeafAccountModel>(this.config.serverUrl + '/admin/authorizedemails/remove', emails)
      .subscribe(() => this.fetchAuthorizedEmail());
  }

  public fetchAdmins() {
    this.authHttp
      .get<string[]>(this.config.serverUrl + '/admin/admins')
      .subscribe((emails: string[]) => {
        this.administrators$.next(emails);
      });
  }

  public addAdmin(email: string) {
    this.authHttp
      .post<LeafAccountModel>(this.config.serverUrl + '/admin/admins', email)
      .subscribe(() => this.fetchAdmins());
  }

  public removeAdmin(email: string) {
    this.authHttp
      .delete<LeafAccountModel>(this.config.serverUrl + '/admin/admins/' + email)
      .subscribe(() => this.fetchAdmins());
  }
}
