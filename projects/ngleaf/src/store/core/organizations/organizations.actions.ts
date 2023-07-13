import { createAction, props } from '@ngrx/store';
import { LeafAccountModel, LeafOrganization } from '../../../api/models';
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
  '[Organizations store] List current organization users',
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
