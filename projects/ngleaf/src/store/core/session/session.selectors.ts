import { createSelector } from '@ngrx/store';
import { AsyncType } from '../../common/index';
import { JWTModel, LeafAccountModel } from '../../../api/models/index';
import { SessionState } from './session.state';

interface AppState {
  session: SessionState;
}

const selectSession = (state: AppState) => state.session;

export const selectSessionState = createSelector(
  selectSession,
 (state: SessionState) => state
);

export const selectInitializationOngoing = createSelector(
  selectSession,
 (state: SessionState) => state.initializationOngoing
);
export const selectCurrentAccount = createSelector(
   selectSession,
  (state: SessionState) => state.currentAccount
);
export const selectCurrentAccountData = createSelector(
  selectCurrentAccount,
  (currentAccount: AsyncType<LeafAccountModel>) => currentAccount.data
);
export const selectSessionToken = createSelector(
   selectSession,
  (state: SessionState) => state.sessionToken
);
export const selectSendResetPasswordKey = createSelector(
   selectSession,
  (state: SessionState) => state.sendResetPasswordKey
);
export const selectResetPassword = createSelector(
   selectSession,
  (state: SessionState) => state.resetPassword
);
export const selectUpdatePassword = createSelector(
   selectSession,
  (state: SessionState) => state.updatePassword
);
export const selectMailingsUnsubscription = createSelector(
   selectSession,
  (state: SessionState) => state.mailingsUnsubscription
);
export const selectIsPending = createSelector(
  selectCurrentAccount,
  selectSessionToken,
  selectSendResetPasswordKey,
  selectResetPassword,
  selectUpdatePassword,
 (
   currentAccount: AsyncType<LeafAccountModel>,
   sessionToken: AsyncType<JWTModel>,
   sendResetPasswordKey: AsyncType<void>,
   resetPassword: AsyncType<void>,
   updatePassword: AsyncType<LeafAccountModel>
 ) => (currentAccount.status.pending || sessionToken.status.pending || sendResetPasswordKey.status.pending || resetPassword.status.pending || updatePassword.status.pending) ?? false
);

export const selectSessionLoadingIsPending = createSelector(
  selectCurrentAccount,
  selectSessionToken,
 (
   currentAccount: AsyncType<LeafAccountModel>,
   sessionToken: AsyncType<JWTModel>,
 ) => (currentAccount.status.pending || sessionToken.status.pending)
);

export const selectUpdateProfile = createSelector(
  selectSession,
 (state: SessionState) => state.updateProfile
);

export const selectSendEmailVerificationCode = createSelector(
  selectSession,
 (state: SessionState) => state.sendEmailVerificationCode
);

export const selectValidateEmailVerificationCode = createSelector(
  selectSession,
 (state: SessionState) => state.validateEmailVerificationCode
);


