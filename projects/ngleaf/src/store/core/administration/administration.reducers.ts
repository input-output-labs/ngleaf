import { createReducer, on } from '@ngrx/store';
import { setAdministrators, setAuthorizedEmails, setUsers} from './administration.actions';
import { AdmininistrationState } from './administration.state';

const initialState: AdmininistrationState = {
  authorizedEmails: [],
  administrators: [],
  users: []
};

export function administrationReducer(reducerState, action): AdmininistrationState {
  return createReducer(
    initialState,
    on(setAuthorizedEmails, (state: AdmininistrationState, {authorizedEmails}) => ({...state, authorizedEmails})),
    on(setAdministrators, (state: AdmininistrationState, {administrators}) => ({...state, administrators})),
    on(setUsers, (state: AdmininistrationState, {users}) => ({...state, users}))
  )(reducerState, action);
}
