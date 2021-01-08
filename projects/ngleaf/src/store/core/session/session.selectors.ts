import { createSelector } from '@ngrx/store';
import { SessionState } from './session.state';

interface AppState {
  session: SessionState;
}

const selectSession = (state: AppState) => state.session;

export const selectCurrentAccount = createSelector(
   selectSession,
  (state: SessionState) => state.currentAccount
);
