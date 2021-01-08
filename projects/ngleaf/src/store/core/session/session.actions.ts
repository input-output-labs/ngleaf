import { createAction, props } from '@ngrx/store';
import { LeafAccountModel } from '../../../models/leaf-account.model';

export const setCurrentAccount = createAction(
    '[Session store] Set current account',
    props<{account: LeafAccountModel | null}>()
);