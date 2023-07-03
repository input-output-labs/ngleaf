import { createSelector } from '@ngrx/store';
import { OrganizationsState } from './organizations.state';
import { AsyncType } from '../../common';
import { LeafOrganization } from '../../../api/models';

interface AppState {
  organizations: OrganizationsState;
}

const selectOrganizationsFromAppState = (state: AppState) => state.organizations;

export const selectOrganizationsState = createSelector(
  selectOrganizationsFromAppState,
 (state: OrganizationsState) => state
);

export const selectAllOrganizations = createSelector(
  selectOrganizationsState,
 (state: OrganizationsState) => state.allOrganizations
);

export const selectAllOrganizationsData = createSelector(
  selectAllOrganizations,
 (allOrganizations: AsyncType<LeafOrganization[]>) => allOrganizations.data
);

export const selectMyOrganizations = createSelector(
  selectOrganizationsState,
 (state: OrganizationsState) => state.myOrganizations
);

export const selectMyOrganizationsData = createSelector(
  selectMyOrganizations,
 (myOrganizations: AsyncType<LeafOrganization[]>) => myOrganizations.data
);

export const selectCurrentOrganizationId = createSelector(
  selectOrganizationsState,
 (state: OrganizationsState) => state.currentOrganizationId
);

export const selectCurrentOrganization = createSelector(
  selectMyOrganizationsData,
  selectCurrentOrganizationId,
 (myOrganizations?: LeafOrganization[], currentOrganizationId?: string) => (myOrganizations || []).find(organization => organization.id === currentOrganizationId)
);

export const selectCurrentOrganizationUsers = createSelector(
  selectOrganizationsState,
 (state: OrganizationsState) => state.currentOrganizationUsers
);

export const selectCreateOrganization = createSelector(
  selectOrganizationsState,
 (state: OrganizationsState) => state.createOrganization
);

export const selectAddUsersToOrganization = createSelector(
  selectOrganizationsState,
 (state: OrganizationsState) => state.addUsersToOrganization
);
