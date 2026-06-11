import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OdooContact, OdooOpportunity } from '../../models/odoo/odoo.models';
import { LeafApiClientConfig, LeafApiClientConfigServiceToken } from '../api-client-config.module';
import { LeafAuthHttpClient } from '../auth-http-client/leaf-auth-http-client.service';

@Injectable()
export class OdooApiClientService {

  public constructor(
    @Inject(LeafApiClientConfigServiceToken) public config: LeafApiClientConfig,
    public http: LeafAuthHttpClient,
  ) {}

  public listContacts(limit?: number): Observable<OdooContact[]> {
    const query = limit != null ? `?limit=${limit}` : '';
    return this.http.get<OdooContact[]>(this.config.serverUrl + '/odoo/contacts' + query);
  }

  public listOpportunities(limit?: number): Observable<OdooOpportunity[]> {
    const query = limit != null ? `?limit=${limit}` : '';
    return this.http.get<OdooOpportunity[]>(this.config.serverUrl + '/odoo/opportunities' + query);
  }
}
