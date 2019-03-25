import {Injectable} from '@angular/core';

import {LeafAccountModel} from '../models/LeafAccount.model';

import {LeafAuthHttpClient} from './LeafAuthHttpClient.service';

@Injectable({
  providedIn: 'root'
})
export class LeafAdminService {

  private url = '';

  constructor(public authHttp: LeafAuthHttpClient) {
  }

  public init(serverUrl) {
    this.url = serverUrl + '/api/admin';
  }

  public addAuthorizedEmail(emails: string[]) {
    return this.authHttp.post<LeafAccountModel>(this.url + '/authorizedemails', emails).toPromise();
  }

  public removeAuthorizedEmail(emails: string[]) {
    return this.authHttp.post<LeafAccountModel>(this.url + '/authorizedemails/remove', emails).toPromise();
  }

  public addAdmin(email: string) {
    return this.authHttp.post<LeafAccountModel>(this.url + '/admin', email).toPromise();
  }

  public removeAdmin(email: string) {
    return this.authHttp.delete<LeafAccountModel>(this.url + '/admin/' + email).toPromise();
  }
}
