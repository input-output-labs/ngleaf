import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LeafAuthHttpClient } from '../auth-http-client/leaf-auth-http-client.service';
import { LeafApiClientConfig, LeafApiClientConfigServiceToken } from '../api-client-config.module';
import { LeafService, PlanAttachment } from '../../models/services';

@Injectable()
export class ServicesApiClientService {
  public constructor(
    @Inject(LeafApiClientConfigServiceToken) public config: LeafApiClientConfig,
    public authHttp: LeafAuthHttpClient
  ) {}

  /**
   * Create a new service
   */
  public createService(service: LeafService): Observable<LeafService> {
    console.log('createService', service);
    return this.authHttp.post<LeafService>(this.config.serverUrl + '/payment/services', service);
  }

  /**
   * Get a service by ID
   */
  public getServiceById(id: string): Observable<LeafService> {
    return this.authHttp.get<LeafService>(`${this.config.serverUrl}/payment/services/${id}`);
  }

  /**
   * Update a service
   */
  public updateService(id: string, service: LeafService): Observable<LeafService> {
    return this.authHttp.put<LeafService>(`${this.config.serverUrl}/payment/services/${id}`, service);
  }

  /**
   * Delete a service
   */
  public deleteService(id: string): Observable<void> {
    return this.authHttp.delete<void>(`${this.config.serverUrl}/payment/services/${id}`);
  }

  /**
   * Get all services for a specific organization
   */
  public getServicesByOrganization(organizationId: string): Observable<LeafService[]> {
    return this.authHttp.get<LeafService[]>(`${this.config.serverUrl}/payment/services/organization/${organizationId}`);
  }

  /**
   * Get all services for a specific account
   */
  public getServicesByAccount(accountId: string): Observable<LeafService[]> {
    return this.authHttp.get<LeafService[]>(`${this.config.serverUrl}/payment/services/account/${accountId}`);
  }

  /**
   * Get all services for the current user's organization
   */
  public getMyOrganizationServices(): Observable<LeafService[]> {
    return this.authHttp.get<LeafService[]>(`${this.config.serverUrl}/payment/services/my-organization`);
  }

  /**
   * Get all services for the current user
   */
  public getMyAccountServices(): Observable<LeafService[]> {
    return this.authHttp.get<LeafService[]>(`${this.config.serverUrl}/payment/services/my-account`);
  }

  /**
   * Search services by key and attachment type
   */
  public searchServices(key: string, attachmentType: PlanAttachment, attachedTo: string): Observable<LeafService[]> {
    const params = new URLSearchParams();
    params.set('key', key);
    params.set('attachmentType', attachmentType.toString());
    params.set('attachedTo', attachedTo);
    
    return this.authHttp.get<LeafService[]>(`${this.config.serverUrl}/payment/services/search?${params.toString()}`);
  }

  /**
   * Get all services (admin only)
   */
  public getAllServices(): Observable<LeafService[]> {
    return this.authHttp.get<LeafService[]>(`${this.config.serverUrl}/payment/services`);
  }

  /**
   * Get available services options
   */
  public fetchAvailableServices(): Observable<LeafService[]> {
    return this.authHttp.get<LeafService[]>(`${this.config.serverUrl}/payment/services/options`);
  }
}
