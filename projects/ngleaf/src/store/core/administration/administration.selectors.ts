import { createSelector } from '@ngrx/store';
import { AdmininistrationState } from './administration.state';

interface AppState {
  administration: AdmininistrationState;
}

export const selectSession = (state: AppState) => state.administration;

export const selectAuthorizedEmails = createSelector(
   selectSession,
  (state: AdmininistrationState) => state.authorizedEmails
);

export const selectAdministrators = createSelector(
  selectSession,
 (state: AdmininistrationState) => state.administrators
);
