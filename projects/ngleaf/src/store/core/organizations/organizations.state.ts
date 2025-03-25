import { LeafOrganization, OrganizationInvitationData } from '../../../api/models';
import { AsyncType, } from '../../common/index';

export interface OrganizationsState {
  allOrganizations: AsyncType<LeafOrganization[]>;
  myOrganizations: AsyncType<LeafOrganization[]>;
  currentOrganizationId?: string;
  /* Actions */
  createOrganization: AsyncType<LeafOrganization>;
  /* Profile */
  updateProfile: AsyncType<LeafOrganization>;
  /* Membership */
  organizationUsers: AsyncType<void>;
  addUsersToOrganization: AsyncType<void>;
  removeUserFromOrganization: AsyncType<void>;
  setUserRole: AsyncType<void>;
  inviteUserToOrganization: AsyncType<LeafOrganization>;
  invitationData: AsyncType<OrganizationInvitationData>;
  invitationAcceptationOrDecline: AsyncType<void>;
  /* Roles */
  createRole: AsyncType<LeafOrganization>;
  updateRole: AsyncType<LeafOrganization>;
  deleteRole: AsyncType<LeafOrganization>;
}
