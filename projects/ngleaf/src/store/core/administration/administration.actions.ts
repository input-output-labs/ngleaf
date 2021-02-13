import { createAction, props } from '@ngrx/store';
import { LeafAccountModel } from '../../../models/leaf-account.model';
import { LeafAuthorizedEmailModel } from '../../../models/leaf-authorized-email.model';

export const setAuthorizedEmails = createAction(
    '[Administration store] Set authorized emails',
    props<{authorizedEmails: LeafAuthorizedEmailModel[]}>()
);

export const setAdministrators = createAction(
    '[Administration store] Set administrators',
    props<{administrators: string[]}>()
);

export const setUsers = createAction(
    '[Administration store] Set users',
    props<{users: LeafAccountModel[]}>()
);
