import { createAction, props } from '@ngrx/store';
import { Observable } from 'rxjs';
import { JWTModel, LeafAccountModel } from '../../../api/models/index';

export const resetCurrentAccount = createAction(
  '[Session store] Reset current account'
);
export const setCurrentAccountCall = createAction(
  '[Session store] Set current account call',
  props<{call: Observable<LeafAccountModel>}>()
);
export const setCurrentAccountSuccess = createAction(
  '[Session store] Set current account success',
  props<{data: LeafAccountModel}>()
);
export const setCurrentAccountFailure = createAction(
  '[Session store] Set current account failure',
  props<{error: any}>()
);

export const resetSessionToken = createAction(
  '[Session store] Reset session token'
);
export const setSessionToken = createAction(
  '[Session store] Set session token',
  props<{sessionToken: JWTModel}>()
);
export const setSessionTokenCall = createAction(
  '[Session store] Set session token call',
  props<{call: Observable<JWTModel>}>()
);
export const setSessionTokenSuccess = createAction(
  '[Session store] Set session token success',
  props<{data: JWTModel}>()
);
export const setSessionTokenFailure = createAction(
  '[Session store] Set session token failure',
  props<{error: any}>()
);

export const resetSendResetPasswordKey = createAction(
  '[Session store] Reset SendResetPasswordKey'
);
export const setSendResetPasswordKeyCall = createAction(
  '[Session store] Set SendResetPasswordKey call',
  props<{call: Observable<void>}>()
);
export const setSendResetPasswordKeySuccess = createAction(
  '[Session store] Set SendResetPasswordKey success'
);
export const setSendResetPasswordKeyFailure = createAction(
  '[Session store] Set SendResetPasswordKey failure',
  props<{error: any}>()
);

export const resetResetPassword = createAction(
  '[Session store] Reset ResetPassword'
);
export const setResetPasswordCall = createAction(
  '[Session store] Set ResetPassword call',
  props<{call: Observable<void>}>()
);
export const setResetPasswordSuccess = createAction(
  '[Session store] Set ResetPassword success'
);
export const setResetPasswordFailure = createAction(
  '[Session store] Set ResetPassword failure',
  props<{error: any}>()
);


