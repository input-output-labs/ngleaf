import { Inject, Injectable } from '@angular/core';
import { EMPTY, Observable, expand, reduce } from 'rxjs';
import { OdooContact, OdooOpportunity } from '../../models/odoo/odoo.models';
import { LeafApiClientConfig, LeafApiClientConfigServiceToken } from '../api-client-config.module';
import { LeafAuthHttpClient } from '../auth-http-client/leaf-auth-http-client.service';

const DEFAULT_OPPORTUNITY_PAGE_SIZE = 200;

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

  public listOpportunities(limit?: number, offset?: number): Observable<OdooOpportunity[]> {
    const params = new URLSearchParams();
    if (limit != null) {
      params.set('limit', String(limit));
    }
    if (offset != null) {
      params.set('offset', String(offset));
    }
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.http.get<OdooOpportunity[]>(this.config.serverUrl + '/odoo/opportunities' + query);
  }

  public listAllOpportunities(pageSize = DEFAULT_OPPORTUNITY_PAGE_SIZE): Observable<OdooOpportunity[]> {
    return this.listOpportunities(pageSize, 0).pipe(
      expand((page, pageIndex) =>
        page.length < pageSize
          ? EMPTY
          : this.listOpportunities(pageSize, (pageIndex + 1) * pageSize),
      ),
      reduce((all, page) => all.concat(page), [] as OdooOpportunity[]),
    );
  }
}
