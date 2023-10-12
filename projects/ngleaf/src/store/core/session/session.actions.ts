import { createAction, props } from '@ngrx/store';
import { Observable } from 'rxjs';
import { JWTModel, LeafAccountModel, LeafAccountProfile } from '../../../api/models/index';

export const resetCurrentAccount = createAction(
  '[Session store] Reset current account'
);
export const initializationDone = createAction(
  '[Session store] Initialization done'
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

export const resetUpdatePassword = createAction(
  '[Session store] Reset UpdatePassword'
);
export const setUpdatePasswordCall = createAction(
  '[Session store] Set UpdatePassword call',
  props<{call: Observable<LeafAccountModel>}>()
);
export const setUpdatePasswordSuccess = createAction(
  '[Session store] Set UpdatePassword success',
  props<{data: LeafAccountModel}>()
);
export const setUpdatePasswordFailure = createAction(
  '[Session store] Set UpdatePassword failure',
  props<{error: any}>()
);

export const resetMailingsUnsubscription = createAction(
  '[Session store] Reset MailingsUnsubscription'
);
export const setMailingsUnsubscriptionCall = createAction(
  '[Session store] Set MailingsUnsubscription call',
  props<{call: Observable<void>}>()
);
export const setMailingsUnsubscriptionSuccess = createAction(
  '[Session store] Set MailingsUnsubscription success'
);
export const setMailingsUnsubscriptionFailure = createAction(
  '[Session store] Set MailingsUnsubscription failure',
  props<{error: any}>()
);

export const updateProfile = createAction(
  '[Session store] Update profile',
  props<{updates: LeafAccountProfile}>()
);
export const updateProfileSuccess = createAction(
  '[Session store] Update profile success',
  props<{data: LeafAccountModel}>()
);
export const updateProfileFailure = createAction(
  '[Session store] Update profile failure',
  props<{error: any}>()
);

