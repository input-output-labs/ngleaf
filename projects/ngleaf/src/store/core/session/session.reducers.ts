import { createReducer, on } from '@ngrx/store';
import { setCurrentAccount} from './session.actions';
import { SessionState } from './session.state';

const initialState: SessionState = {
    currentAccount: null
};

export function sessionReducer(reducerState, action): SessionState {
  return createReducer(
    initialState,
    on(setCurrentAccount, (state: SessionState, {account}) => ({...state, currentAccount: account}))
  )(reducerState, action);
}
