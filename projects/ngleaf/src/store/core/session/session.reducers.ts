import { createReducer, on } from '@ngrx/store';
import { asyncTypeFailure, asyncTypePending, asyncTypeSuccess, createAsyncTypeFromCall, createEmptyAsyncType } from '../../common/index';
import { resetCurrentAccount, setCurrentAccountCall, setCurrentAccountSuccess, setCurrentAccountFailure, setSessionTokenCall, setSessionTokenSuccess, setSessionTokenFailure, resetSessionToken, resetSendResetPasswordKey, setSendResetPasswordKeyCall, setSendResetPasswordKeySuccess, setSendResetPasswordKeyFailure, resetResetPassword, setResetPasswordCall, setResetPasswordSuccess, setResetPasswordFailure, setSessionToken, resetUpdatePassword, setUpdatePasswordCall, setUpdatePasswordSuccess, setUpdatePasswordFailure, resetMailingsUnsubscription, setMailingsUnsubscriptionCall, setMailingsUnsubscriptionSuccess, setMailingsUnsubscriptionFailure, initializationDone} from './session.actions';
import { SessionState } from './session.state';

const initialState: SessionState = {
    initializationOngoing: true,
    currentAccount: createEmptyAsyncType(),
    sessionToken: createEmptyAsyncType(),
    sendResetPasswordKey: createEmptyAsyncType(),
    resetPassword: createEmptyAsyncType(),
    updatePassword: createEmptyAsyncType(),
    mailingsUnsubscription: createEmptyAsyncType(),
};

export function sessionReducer(reducerState, action): SessionState {
  return createReducer(
    initialState,
    /* Initialization */
    on(initializationDone, (state: SessionState) => ({...state, initializationOngoing: false})),
    /** Current Account */
    on(resetCurrentAccount, (state: SessionState) => ({...state, currentAccount: createEmptyAsyncType()})),
    on(setCurrentAccountCall, (state: SessionState, {call}) => ({...state, currentAccount: createAsyncTypeFromCall(call)})),
    on(setCurrentAccountSuccess, (state: SessionState, {data}) => ({...state, currentAccount: asyncTypeSuccess(state.currentAccount, data)})),
    on(setCurrentAccountFailure, (state: SessionState, {error}) => ({...state, currentAccount: asyncTypeFailure(state.currentAccount, error)})),
    /** Session Token */
    on(resetSessionToken, (state: SessionState) => ({...state, sessionToken: createEmptyAsyncType()})),
    on(setSessionToken, (state: SessionState, {sessionToken}) => ({...state, sessionToken: asyncTypeSuccess(state.sessionToken, sessionToken)})),
    on(setSessionTokenCall, (state: SessionState, {call}) => ({...state, sessionToken: createAsyncTypeFromCall(call)})),
    on(setSessionTokenSuccess, (state: SessionState, {data}) => ({...state, sessionToken: asyncTypeSuccess(state.sessionToken, data)})),
    on(setSessionTokenFailure, (state: SessionState, {error}) => ({...state, sessionToken: asyncTypeFailure(state.sessionToken, error)})),
    /** SendResetPasswordKey */
    on(resetSendResetPasswordKey, (state: SessionState) => ({...state, sendResetPasswordKey: createEmptyAsyncType()})),
    on(setSendResetPasswordKeyCall, (state: SessionState, {call}) => ({...state, sendResetPasswordKey: createAsyncTypeFromCall(call)})),
    on(setSendResetPasswordKeySuccess, (state: SessionState) => ({...state, sendResetPasswordKey: asyncTypeSuccess(state.sendResetPasswordKey)})),
    on(setSendResetPasswordKeyFailure, (state: SessionState, {error}) => ({...state, sendResetPasswordKey: asyncTypeFailure(state.sendResetPasswordKey, error)})),
    /** ResetPassword */
    on(resetResetPassword, (state: SessionState) => ({...state, resetPassword: createEmptyAsyncType()})),
    on(setResetPasswordCall, (state: SessionState, {call}) => ({...state, resetPassword: createAsyncTypeFromCall(call)})),
    on(setResetPasswordSuccess, (state: SessionState) => ({...state, resetPassword: asyncTypeSuccess(state.resetPassword)})),
    on(setResetPasswordFailure, (state: SessionState, {error}) => ({...state, resetPassword: asyncTypeFailure(state.resetPassword, error)})),
    /** UpdatePassword */
    on(resetUpdatePassword, (state: SessionState) => ({...state, updatePassword: createEmptyAsyncType()})),
    on(setUpdatePasswordCall, (state: SessionState, {call}) => ({...state, updatePassword: createAsyncTypeFromCall(call)})),
    on(setUpdatePasswordSuccess, (state: SessionState, {data}) => (
      {
        ...state,
        updatePassword: asyncTypeSuccess(state.updatePassword, data),
        currentAccount: asyncTypeSuccess(state.currentAccount, data)
      })),
    on(setUpdatePasswordFailure, (state: SessionState, {error}) => ({...state, updatePassword: asyncTypeFailure(state.updatePassword, error)})),
    /** ResetPassword */
    on(resetMailingsUnsubscription, (state: SessionState) => ({...state, mailingsUnsubscription: createEmptyAsyncType()})),
    on(setMailingsUnsubscriptionCall, (state: SessionState, {call}) => ({...state, mailingsUnsubscription: createAsyncTypeFromCall(call)})),
    on(setMailingsUnsubscriptionSuccess, (state: SessionState) => ({...state, mailingsUnsubscription: asyncTypeSuccess(state.mailingsUnsubscription)})),
    on(setMailingsUnsubscriptionFailure, (state: SessionState, {error}) => ({...state, mailingsUnsubscription: asyncTypeFailure(state.mailingsUnsubscription, error)}))
  )(reducerState, action);
}
