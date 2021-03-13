import { createReducer, on } from '@ngrx/store';
import { setCurrentAccount, setSessionLoading} from './session.actions';
import { SessionState } from './session.state';

const initialState: SessionState = {
    currentAccount: null,
    sessionLoading: true
};

export function sessionReducer(reducerState, action): SessionState {
  return createReducer(
    initialState,
    on(setCurrentAccount, (state: SessionState, {account}) => ({...state, currentAccount: account})),
    on(setSessionLoading, (state: SessionState, {isLoading}) => ({...state, sessionLoading: isLoading}))
  )(reducerState, action);
}
