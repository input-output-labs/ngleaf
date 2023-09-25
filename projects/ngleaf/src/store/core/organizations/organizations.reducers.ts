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
  organizationUsers: createEmptyAsyncType(),
  createOrganization: createEmptyAsyncType(),
  addUsersToOrganization: createEmptyAsyncType(),
  inviteUserToOrganization: createEmptyAsyncType(),
  invitationData: createEmptyAsyncType(),
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
  )(reducerState, action);
}
