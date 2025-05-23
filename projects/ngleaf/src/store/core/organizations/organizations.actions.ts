import { createAction, props } from '@ngrx/store';
import { LeafAccountModel, LeafAccountProfile, LeafOrganization, OrganizationInvitationData, OrganizationRole } from '../../../api/models';
import { Observable } from 'rxjs';

export const listAllOrganizations = createAction(
  '[Organizations store] List all organizations'
);
export const setAllOrganizationsSuccess = createAction(
    '[Organizations store] Set all organizations success',
    props<{data: LeafOrganization[]}>()
);
export const setAllOrganizationsFailure = createAction(
    '[Organizations store] Set all organizations failure',
    props<{error: any}>()
);

export const listMyOrganizations = createAction(
    '[Organizations store] List my organizations'
);
export const listMyOrganizationsCall = createAction(
    '[Organizations store] List my organizations call',
    props<{call: Observable<LeafOrganization[]>}>()
);
export const setMyOrganizationsSuccess = createAction(
    '[Organizations store] Set my organizations success',
    props<{data: LeafOrganization[]}>()
);
export const setMyOrganizationsFailure = createAction(
    '[Organizations store] Set my organizations failure',
    props<{error: any}>()
);

export const setCurrentOrganizationId = createAction(
  '[Organizations store] Set current organization id',
  props<{selectedOrganizationId?: string}>()
);

export const assignUserToOrganizationCall = createAction(
    '[Organizations store] Assign User To Organization call',
    props<{call: Observable<void>}>()
);
export const assignUserToOrganizationSuccess = createAction(
    '[Organizations store] Assign User To Organization success',
);
export const assignUserToOrganizationFailure = createAction(
    '[Organizations store] Assign User To Organization failure',
    props<{error: any}>()
);

export const listCurrentOrganizationUsers = createAction(
  '[Organizations store] List current organization users'
);
export const listOrganizationUsers = createAction(
  '[Organizations store] List organization users',
  props<{organizationId: string}>()
);
export const setOrganizationUsersSuccess = createAction(
  '[Organizations store] Set organization users success',
  props<{organizationId: string, data: LeafAccountModel[]}>()
);
export const setOrganizationUsersFailure = createAction(
  '[Organizations store] Set organization users failure',
  props<{error: any}>()
);
export const resetOrganizationUsers = createAction(
  '[Organizations store] Reset organization users'
);

export const createOrganization = createAction(
  '[Organizations store] Create organization',
  props<{organization: LeafOrganization}>()
);
export const createOrganizationSuccess = createAction(
  '[Organizations store] Create organization success',
  props<{data: LeafOrganization}>()
);
export const createOrganizationFailure = createAction(
  '[Organizations store] Create organization failure',
  props<{error: any}>()
);

export const addUsersToOrganization = createAction(
  '[Organizations store] Add users to organization',
  props<{id: string, accountIds: string[]}>()
);
export const addUsersToOrganizationSuccess = createAction(
  '[Organizations store] Add users to organization success',
);
export const addUsersToOrganizationFailure = createAction(
  '[Organizations store] Add users to organization failure',
  props<{error: any}>()
);

export const removeUserFromOrganization = createAction(
  '[Organizations store] Remove user from organization',
  props<{accountId: string}>()
);
export const removeUserFromOrganizationSuccess = createAction(
  '[Organizations store] Remove user from organization success',
  props<{data: LeafOrganization}>()
);
export const removeUserFromOrganizationFailure = createAction(
  '[Organizations store] Remove user from organization failure',
  props<{error: any}>()
);

export const setUserRole = createAction(
  '[Organizations store] Set user role',
  props<{accountId: string, role: string}>()
);
export const setUserRoleSuccess = createAction(
  '[Organizations store] Set user role success',
  props<{data: LeafOrganization}>()
);
export const setUserRoleFailure = createAction(
  '[Organizations store] Set user role failure',
  props<{error: any}>()
);

export const inviteUserToOrganization = createAction(
  '[Organizations store] Invite user to organization',
  props<{email: string}>()
);
export const inviteUserToOrganizationSuccess = createAction(
  '[Organizations store] Invite user to organization success',
  props<{data: LeafOrganization}>()
);
export const inviteUserToOrganizationFailure = createAction(
  '[Organizations store] Invite user to organization failure',
  props<{error: any}>()
);

export const getInvitationData = createAction(
  '[Organizations store] Get invitation data',
  props<{id: string, email: string}>()
);
export const getInvitationDataSuccess = createAction(
  '[Organizations store] Get invitation data success',
  props<{data: OrganizationInvitationData}>()
);
export const getInvitationDataFailure = createAction(
  '[Organizations store] Get invitation data failure',
  props<{error: any}>()
);

export const cancelInvitation = createAction(
  '[Organizations store] Cancel user invitation to organization',
  props<{email: string}>()
);

export const createRole = createAction(
  '[Organizations store] Create role',
  props<{name: string}>()
);
export const createRoleSuccess = createAction(
  '[Organizations store] Create role success',
  props<{data: LeafOrganization}>()
);
export const createRoleFailure = createAction(
  '[Organizations store] Create role failure',
  props<{error: any}>()
);

export const updateRole = createAction(
  '[Organizations store] Update role',
  props<{roleName: string, role: OrganizationRole}>()
);
export const updateRoleSuccess = createAction(
  '[Organizations store] Update role success',
  props<{data: LeafOrganization}>()
);
export const updateRoleFailure = createAction(
  '[Organizations store] Update role failure',
  props<{error: any}>()
);

export const deleteRole = createAction(
  '[Organizations store] Delete role',
  props<{role: OrganizationRole}>()
);
export const deleteRoleSuccess = createAction(
  '[Organizations store] Delete role success',
  props<{data: LeafOrganization}>()
);
export const deleteRoleFailure = createAction(
  '[Organizations store] Delete role failure',
  props<{error: any}>()
);

export const acceptInvitation = createAction(
  '[Organizations store] Accept invitation',
  props<{organizationId: string, email: string}>()
);
export const declineInvitation = createAction(
  '[Organizations store] Decline invitation',
  props<{organizationId: string, email: string}>()
);
export const invitationAcceptationOrDeclineSuccess = createAction(
  '[Organizations store] Set invitation acceptation or decline success',
);
export const invitationAcceptationOrDeclineFailure = createAction(
  '[Organizations store] Set invitation acceptation or decline failure',
  props<{error: any}>()
);

export const updateOrganizationProfile = createAction(
  '[Organizations store] Update organization profile',
  props<{organizationId: string, profile: LeafAccountProfile}>()
);
export const updateOrganizationProfileSuccess = createAction(
  '[Organizations store] Update organization profile success',
  props<{data: LeafOrganization}>()
);
export const updateOrganizationProfileFailure = createAction(
  '[Organizations store] Update organization profile failure',
  props<{error: any}>()
);
