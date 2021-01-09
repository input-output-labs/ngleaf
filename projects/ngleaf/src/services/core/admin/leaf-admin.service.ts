import { Injectable, Inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { LeafAccountModel, LeafAuthorizedEmailModel } from '../../../models/index';
import { LeafConfigServiceToken } from '../../leaf-config.module';
import { LeafAuthHttpClient } from '../auth-http-client/leaf-auth-http-client.service';
import { setAdministrators, setAuthorizedEmails } from '../../../store/core/administration/administration.actions';

@Injectable()
export class LeafAdminService {

  constructor(
    private store: Store,
    @Inject(LeafConfigServiceToken) private config,
    public authHttp: LeafAuthHttpClient
  ) {}

  public fetchAuthorizedEmail() {
    this.authHttp
      .get<LeafAuthorizedEmailModel[]>(this.config.serverUrl + '/admin/authorizedemails')
      .subscribe((emails: LeafAuthorizedEmailModel[]) => {
        this.store.dispatch(setAuthorizedEmails({authorizedEmails: emails}));
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
      .subscribe((administrators: string[]) => {
        this.store.dispatch(setAdministrators({administrators}));
      });
  }

  public addAdmin(newAdminId: string) {
    this.authHttp
      .post<LeafAccountModel>(this.config.serverUrl + '/admin/admins', newAdminId)
      .subscribe(() => this.fetchAdmins());
  }

  public removeAdmin(email: string) {
    this.authHttp
      .delete<LeafAccountModel>(this.config.serverUrl + '/admin/admins/' + email)
      .subscribe(() => this.fetchAdmins());
  }
}
