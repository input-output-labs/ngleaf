import { Inject, Injectable } from '@angular/core';
import { EMPTY, Observable, expand, reduce } from 'rxjs';
import { OdooContact, OdooOpportunity, OdooProduct } from '../../models/odoo/odoo.models';
import { LeafApiClientConfig, LeafApiClientConfigServiceToken } from '../api-client-config.module';
import { LeafAuthHttpClient } from '../auth-http-client/leaf-auth-http-client.service';

const DEFAULT_OPPORTUNITY_PAGE_SIZE = 200;

@Injectable()
export class OdooApiClientService {

  public constructor(
    @Inject(LeafApiClientConfigServiceToken) public config: LeafApiClientConfig,
    public http: LeafAuthHttpClient,
  ) {}

  public listContacts(limit?: number, query?: string): Observable<OdooContact[]> {
    const params = new URLSearchParams();
    if (limit != null) {
      params.set('limit', String(limit));
    }
    const trimmedQuery = query?.trim();
    if (trimmedQuery) {
      params.set('q', trimmedQuery);
    }
    const queryString = params.toString();
    return this.http.get<OdooContact[]>(
      this.config.serverUrl + '/odoo/contacts' + (queryString ? `?${queryString}` : ''),
    );
  }

  public getContact(contactId: string): Observable<OdooContact> {
    return this.http.get<OdooContact>(
      this.config.serverUrl + '/odoo/contacts/' + encodeURIComponent(contactId),
    );
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

  public listProducts(limit?: number): Observable<OdooProduct[]> {
    const query = limit != null ? `?limit=${limit}` : '';
    return this.http.get<OdooProduct[]>(this.config.serverUrl + '/odoo/products' + query);
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
