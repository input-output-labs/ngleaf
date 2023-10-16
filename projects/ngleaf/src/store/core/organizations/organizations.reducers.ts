import { createReducer, on } from '@ngrx/store';

import * as Actions from './organizations.actions';

import {
  asyncTypeFailure,
  asyncTypeSuccess,
  createEmptyAsyncType,
  asyncTypePending,
  asyncUpsert,
} from '../../common/async-type';
import { OrganizationsState } from './organizations.state';
import { setOrganizationUsersById } from './organizations.helper';

const initialState: OrganizationsState = {
  allOrganizations: createEmptyAsyncType(),
  myOrganizations: createEmptyAsyncType(),
  /* Actions */
  createOrganization: createEmptyAsyncType(),
  /* Membership */
  organizationUsers: createEmptyAsyncType(),
  addUsersToOrganization: createEmptyAsyncType(),
  removeUserFromOrganization: createEmptyAsyncType(),
  setUserRole: createEmptyAsyncType(),
  inviteUserToOrganization: createEmptyAsyncType(),
  invitationData: createEmptyAsyncType(),
  invitationAcceptationOrDecline: createEmptyAsyncType(),
  /* Roles */
  createRole: createEmptyAsyncType(),
  updateRole: createEmptyAsyncType(),
  deleteRole: createEmptyAsyncType(),
};

export function organizationsReducer(reducerState, action): OrganizationsState {
  return createReducer(
    initialState,
    /* All organizations */
    on(
      Actions.setAllOrganizationsSuccess,
      (state: OrganizationsState, {data}) => ({
        ...state,
        allOrganizations: asyncTypeSuccess(state.allOrganizations, data),
      })
    ),
    on(
      Actions.setAllOrganizationsFailure,
      (state: OrganizationsState, {error}) => ({
        ...state,
        allOrganizations: asyncTypeFailure(state.allOrganizations, error),
      })
    ),
    /* My organizations */
    on(
      Actions.setMyOrganizationsSuccess,
      (state: OrganizationsState, {data}) => ({
        ...state,
        myOrganizations: asyncTypeSuccess(state.myOrganizations, data),
        currentOrganizationId: data.length === 1 ? data[0].id : state.currentOrganizationId,
      })
    ),
    on(
      Actions.setMyOrganizationsFailure,
      (state: OrganizationsState, {error}) => ({
        ...state,
        myOrganizations: asyncTypeFailure(state.myOrganizations, error),
      })
    ),
    /* Current organization */
    on(
      Actions.setCurrentOrganizationId,
      (state: OrganizationsState, {selectedOrganizationId}) => ({
        ...state,
        currentOrganizationId: selectedOrganizationId,
      })
    ),
    /* Current organization users */
    on(
      Actions.listOrganizationUsers,
      (state: OrganizationsState, {organizationId}) => ({
        ...state,
        organizationUsers: asyncTypePending(state.organizationUsers),
      })
    ),
    on(
      Actions.setOrganizationUsersSuccess,
      (state: OrganizationsState, {organizationId, data}) => ({
        ...state,
        allOrganizations: setOrganizationUsersById(state.allOrganizations, organizationId, data),
        myOrganizations: setOrganizationUsersById(state.myOrganizations, organizationId, data),
        organizationUsers: asyncTypeSuccess(state.organizationUsers),
      })
    ),
    on(
      Actions.setOrganizationUsersFailure,
      (state: OrganizationsState, {error}) => ({
        ...state,
        organizationUsers: asyncTypeFailure(state.organizationUsers, error),
      })
    ),
    on(
      Actions.resetOrganizationUsers,
      (state: OrganizationsState) => ({
        ...state,
        currentOrganizationUsers: createEmptyAsyncType(),
      })
    ),
    /* Create organization */
    on(
      Actions.createOrganization,
      (state: OrganizationsState, {}) => ({
        ...state,
        createOrganization: asyncTypePending(state.createOrganization),
      })
    ),
    on(
      Actions.createOrganizationSuccess,
      (state: OrganizationsState) => ({
        ...state,
        createOrganization: asyncTypeSuccess(state.createOrganization),
      })
    ),
    on(
      Actions.createOrganizationFailure,
      (state: OrganizationsState, {error}) => ({
        ...state,
        createOrganization: asyncTypeFailure(state.createOrganization, error),
      })
    ),
    /* Add users to organization */
    on(
      Actions.addUsersToOrganization,
      (state: OrganizationsState, {}) => ({
        ...state,
        addUsersToOrganization: asyncTypePending(state.addUsersToOrganization),
      })
    ),
    on(
      Actions.addUsersToOrganizationSuccess,
      (state: OrganizationsState) => ({
        ...state,
        addUsersToOrganization: asyncTypeSuccess(state.addUsersToOrganization),
      })
    ),
    on(
      Actions.addUsersToOrganizationFailure,
      (state: OrganizationsState, {error}) => ({
        ...state,
        addUsersToOrganization: asyncTypeFailure(state.addUsersToOrganization, error),
      })
    ),
    /* Set user role in organization */
    on(
      Actions.setUserRole,
      (state: OrganizationsState, {}) => ({
        ...state,
        setUserRole: asyncTypePending(state.setUserRole),
      })
    ),
    on(
      Actions.setUserRoleSuccess,
      (state: OrganizationsState, {data}) => ({
        ...state,
        setUserRole: asyncTypeSuccess(state.setUserRole),
        myOrganizations: asyncUpsert(data, state.myOrganizations),
      })
    ),
    on(
      Actions.setUserRoleFailure,
      (state: OrganizationsState, {error}) => ({
        ...state,
        setUserRole: asyncTypeFailure(state.setUserRole, error),
      })
    ),
    /* Remove user from organization */
    on(
      Actions.removeUserFromOrganization,
      (state: OrganizationsState, {}) => ({
        ...state,
        removeUserFromOrganization: asyncTypePending(state.removeUserFromOrganization),
      })
    ),
    on(
      Actions.removeUserFromOrganizationSuccess,
      (state: OrganizationsState, {data}) => ({
        ...state,
        removeUserFromOrganization: asyncTypeSuccess(state.removeUserFromOrganization),
        myOrganizations: asyncUpsert(data, state.myOrganizations),
      })
    ),
    on(
      Actions.removeUserFromOrganizationFailure,
      (state: OrganizationsState, {error}) => ({
        ...state,
        removeUserFromOrganization: asyncTypeFailure(state.removeUserFromOrganization, error),
      })
    ),
    /* Invite user to organization */
    on(
      Actions.inviteUserToOrganization,
      (state: OrganizationsState, {}) => ({
        ...state,
        inviteUserToOrganization: asyncTypePending(state.inviteUserToOrganization),
      })
    ),
    on(
      Actions.inviteUserToOrganizationSuccess,
      (state: OrganizationsState, {data}) => ({
        ...state,
        inviteUserToOrganization: asyncTypeSuccess(state.inviteUserToOrganization),
        allOrganizations: asyncUpsert(data, state.allOrganizations),
        myOrganizations: asyncUpsert(data, state.allOrganizations),
      })
    ),
    on(
      Actions.inviteUserToOrganizationFailure,
      (state: OrganizationsState, {error}) => ({
        ...state,
        inviteUserToOrganization: asyncTypeFailure(state.inviteUserToOrganization, error),
      })
    ),
    /* Get invitation data for organization */
    on(
      Actions.getInvitationData,
      (state: OrganizationsState, {}) => ({
        ...state,
        invitationData: asyncTypePending(state.invitationData),
      })
    ),
    on(
      Actions.getInvitationDataSuccess,
      (state: OrganizationsState, {data}) => ({
        ...state,
        invitationData: asyncTypeSuccess(state.invitationData, data),
      })
    ),
    on(
      Actions.getInvitationDataFailure,
      (state: OrganizationsState, {error}) => ({
        ...state,
        invitationData: asyncTypeFailure(state.invitationData, error),
      })
    ),
    /* Create role */
    on(
      Actions.createRole,
      (state: OrganizationsState, {}) => ({
        ...state,
        createRole: asyncTypePending(state.createRole),
      })
    ),
    on(
      Actions.createRoleSuccess,
      (state: OrganizationsState, {data}) => ({
        ...state,
        createRole: asyncTypeSuccess(state.createRole),
        myOrganizations: asyncUpsert(data, state.myOrganizations),
      })
    ),
    on(
      Actions.createRoleFailure,
      (state: OrganizationsState, {error}) => ({
        ...state,
        createRole: asyncTypeFailure(state.createRole, error),
      })
    ),
    /* Update role */
    on(
      Actions.updateRole,
      (state: OrganizationsState, {}) => ({
        ...state,
        updateRole: asyncTypePending(state.updateRole),
      })
    ),
    on(
      Actions.updateRoleSuccess,
      (state: OrganizationsState, {data}) => ({
        ...state,
        updateRole: asyncTypeSuccess(state.updateRole),
        myOrganizations: asyncUpsert(data, state.myOrganizations),
      })
    ),
    on(
      Actions.updateRoleFailure,
      (state: OrganizationsState, {error}) => ({
        ...state,
        updateRole: asyncTypeFailure(state.updateRole, error),
      })
    ),
    /* Delete role */
    on(
      Actions.deleteRole,
      (state: OrganizationsState, {}) => ({
        ...state,
        deleteRole: asyncTypePending(state.deleteRole),
      })
    ),
    on(
      Actions.deleteRoleSuccess,
      (state: OrganizationsState, {data}) => ({
        ...state,
        deleteRole: asyncTypeSuccess(state.deleteRole),
        myOrganizations: asyncUpsert(data, state.myOrganizations),
      })
    ),
    on(
      Actions.deleteRoleFailure,
      (state: OrganizationsState, {error}) => ({
        ...state,
        deleteRole: asyncTypeFailure(state.deleteRole, error),
      })
    ),
    /* Accept / decline invitation */
    on(
      Actions.acceptInvitation,
      (state: OrganizationsState, {}) => ({
        ...state,
        invitationAcceptationOrDecline: asyncTypePending(state.invitationAcceptationOrDecline),
      })
    ),
    on(
      Actions.declineInvitation,
      (state: OrganizationsState, {}) => ({
        ...state,
        invitationAcceptationOrDecline: asyncTypePending(state.invitationAcceptationOrDecline),
      })
    ),
    on(
      Actions.invitationAcceptationOrDeclineSuccess,
      (state: OrganizationsState) => ({
        ...state,
        invitationAcceptationOrDecline: asyncTypeSuccess(state.invitationAcceptationOrDecline),
      })
    ),
    on(
      Actions.invitationAcceptationOrDeclineFailure,
      (state: OrganizationsState, {error}) => ({
        ...state,
        invitationAcceptationOrDecline: asyncTypeFailure(state.invitationAcceptationOrDecline, error),
      })
    ),
  )(reducerState, action);
}
