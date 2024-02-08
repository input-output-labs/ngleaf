import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LeafAuthHttpClient } from '../auth-http-client/leaf-auth-http-client.service';
import { LeafApiClientConfig, LeafApiClientConfigServiceToken } from '../api-client-config.module';
import { LeafOrganization, OrganizationInvitationData, OrganizationRole } from '../../models/organizations';
import { LeafAccountModel, LeafAccountProfile } from '../../models/leaf-account.model';

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

    public updateOrganizationProfile(organizationId: string, profile: LeafAccountProfile) {
      return this.authHttp.post<LeafOrganization>(`${this.config.serverUrl}/organizations/${organizationId}/profile`, profile);
    }

    public addUsersToOrganization(id: string, accountIds: string[]): Observable<LeafOrganization> {
      return this.authHttp.post<LeafOrganization>(`${this.config.serverUrl}/organizations/${id}/members`, {accountIds});
    }

    public removeUserFromOrganization(accountId: string): Observable<LeafOrganization> {
      return this.authHttp.delete<LeafOrganization>(`${this.config.serverUrl}/organizations/selected/members/${accountId}`);
    }

    public setUserRole(accountId: string, role: string): Observable<LeafOrganization> {
      return this.authHttp.put<LeafOrganization>(`${this.config.serverUrl}/organizations/selected/members/${accountId}/role`, {role});
    }

    public inviteUserToOrganization(email: string): Observable<LeafOrganization> {
      return this.authHttp.post<LeafOrganization>(`${this.config.serverUrl}/organizations/selected/invitations`, {email});
    }

    public getInvitationData(organizationId: string, email: string): Observable<OrganizationInvitationData> {
      return this.authHttp.get<OrganizationInvitationData>(`${this.config.serverUrl}/organizations/${organizationId}/invitations/${email}`);
    }

    public acceptInvitation(organizationId: string, email: string): Observable<void> {
      return this.authHttp.post<void>(`${this.config.serverUrl}/organizations/${organizationId}/invitations/${email}/accept`, {});
    }

    public cancelInvitation(email: string): Observable<void> {
      return this.authHttp.post<void>(`${this.config.serverUrl}/organizations/selected/invitations/${email}/cancel`, {});
    }

    public declineInvitation(organizationId: string, email: string): Observable<void> {
      return this.authHttp.post<void>(`${this.config.serverUrl}/organizations/${organizationId}/invitations/${email}/decline`, {});
    }

    public createRole(name: string): Observable<LeafOrganization> {
      return this.authHttp.post<LeafOrganization>(`${this.config.serverUrl}/organizations/selected/policies/roles`, {name});
    }

    public updateRole(roleName: string, role: OrganizationRole): Observable<LeafOrganization> {
      return this.authHttp.put<LeafOrganization>(`${this.config.serverUrl}/organizations/selected/policies/roles/${roleName}`, role);
    }

    public deleteRole(role: OrganizationRole): Observable<LeafOrganization> {
      return this.authHttp.delete<LeafOrganization>(`${this.config.serverUrl}/organizations/selected/policies/roles/${role.name}`);
    }
}
