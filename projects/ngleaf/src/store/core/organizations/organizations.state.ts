import { LeafOrganization } from '../../../api/models';
import { AsyncType, } from '../../common/index';

export interface OrganizationsState {
  allOrganizations: AsyncType<LeafOrganization[]>;
  myOrganizations: AsyncType<LeafOrganization[]>;
  currentOrganizationId?: string;
  currentOrganizationUsers: AsyncType<void>;
  createOrganization: AsyncType<void>;
  addUsersToOrganization: AsyncType<void>;
}
