import { Injectable } from '@angular/core';

import { LeafAccountModel } from '../models/leaf-account.model';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LeafAdminService {
  private url = '';

  constructor(public authHttp: HttpClient) {}

  public init(serverUrl) {
    this.url = serverUrl + '/api/admin';
  }

  public addAuthorizedEmail(emails: string[]) {
    return this.authHttp
      .post<LeafAccountModel>(this.url + '/authorizedemails', emails)
      .toPromise();
  }

  public removeAuthorizedEmail(emails: string[]) {
    return this.authHttp
      .post<LeafAccountModel>(this.url + '/authorizedemails/remove', emails)
      .toPromise();
  }

  public addAdmin(email: string) {
    return this.authHttp
      .post<LeafAccountModel>(this.url + '/admin', email)
      .toPromise();
  }

  public removeAdmin(email: string) {
    return this.authHttp
      .delete<LeafAccountModel>(this.url + '/admin/' + email)
      .toPromise();
  }
}
