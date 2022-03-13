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
export const selectIsPending = createSelector(
  selectCurrentAccount,
  selectSessionToken,
  selectSendResetPasswordKey,
  selectResetPassword,
 (
   currentAccount: AsyncType<LeafAccountModel>,
   sessionToken: AsyncType<JWTModel>,
   sendResetPasswordKey: AsyncType<void>,
   resetPassword: AsyncType<void>
 ) => currentAccount.status.pending || sessionToken.status.pending || sendResetPasswordKey.status.pending || resetPassword.status.pending
);
