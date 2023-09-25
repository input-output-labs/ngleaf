import { LeafOrganization, OrganizationInvitationData } from '../../../api/models';
import { AsyncType, } from '../../common/index';

export interface OrganizationsState {
  allOrganizations: AsyncType<LeafOrganization[]>;
  myOrganizations: AsyncType<LeafOrganization[]>;
  currentOrganizationId?: string;
  organizationUsers: AsyncType<void>;
  createOrganization: AsyncType<void>;
  addUsersToOrganization: AsyncType<void>;
  inviteUserToOrganization: AsyncType<LeafOrganization>;
  invitationData: AsyncType<OrganizationInvitationData>;
}
