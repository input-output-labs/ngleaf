import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LeafAuthHttpClient } from '../auth-http-client/leaf-auth-http-client.service';
import { LeafApiClientConfig, LeafApiClientConfigServiceToken } from '../api-client-config.module';
import { LeafOrganization, OrganizationInvitationData } from '../../models/organizations';
import { LeafAccountModel } from '../../models/leaf-account.model';

@Injectable()
export class OrganizationsApiClientService {
  public constructor(
    @Inject(LeafApiClientConfigServiceToken) public config: LeafApiClientConfig,
    public authHttp: LeafAuthHttpClient
    ) {}

    public listAllOrganizations(): Observable<LeafOrganization[]> {
      return this.authHttp.get<LeafOrganization[]>(`${this.config.serverUrl}/organizations`);
    }

    public listMyOrganizations(): Observable<LeafOrganization[]> {
      return this.authHttp.get<LeafOrganization[]>(`${this.config.serverUrl}/organizations/mine`);
    }

    public getOrganizationById(id: string): Observable<LeafOrganization> {
      return this.authHttp.get<LeafOrganization>(`${this.config.serverUrl}/organizations/${id}`);
    }

    public listOrganizationUsersById(id: string): Observable<LeafAccountModel[]> {
      return this.authHttp.get<LeafAccountModel[]>(`${this.config.serverUrl}/organizations/${id}/members`);
    }

    public createOrganization(organization: LeafOrganization): Observable<LeafOrganization> {
      return this.authHttp.post<LeafOrganization>(`${this.config.serverUrl}/organizations`, organization);
    }

    public addUsersToOrganization(id: string, accountIds: string[]): Observable<LeafOrganization> {
      return this.authHttp.post<LeafOrganization>(`${this.config.serverUrl}/organizations/${id}/members`, {accountIds});
    }

    public inviteUserToOrganization(id: string, email: string): Observable<LeafOrganization> {
      return this.authHttp.post<LeafOrganization>(`${this.config.serverUrl}/organizations/${id}/invitations`, {email});
    }

    public getInvitationData(organizationId: string, email: string): Observable<OrganizationInvitationData> {
      return this.authHttp.get<OrganizationInvitationData>(`${this.config.serverUrl}/organizations/${organizationId}/invitations/${email}`);
    }

    public acceptInvitation(organizationId: string, email: string): Observable<void> {
      return this.authHttp.post<void>(`${this.config.serverUrl}/organizations/${organizationId}/invitations/${email}/accept`, {});
    }

    public cancelInvitation(organizationId: string, email: string): Observable<void> {
      return this.authHttp.post<void>(`${this.config.serverUrl}/organizations/${organizationId}/invitations/${email}/cancel`, {});
    }

    public declineInvitation(organizationId: string, email: string): Observable<void> {
      return this.authHttp.post<void>(`${this.config.serverUrl}/organizations/${organizationId}/invitations/${email}/decline`, {});
    }
}
