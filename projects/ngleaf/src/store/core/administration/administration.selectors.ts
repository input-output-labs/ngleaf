import { createSelector } from '@ngrx/store';
import { AdmininistrationState } from './administration.state';

interface AppState {
  administration: AdmininistrationState;
}

const selectAdministrationSession = (state: AppState) => state.administration;

export const selectAuthorizedEmails = createSelector(
  selectAdministrationSession,
  (state: AdmininistrationState) => state.authorizedEmails
);

export const selectAdministrators = createSelector(
  selectAdministrationSession,
 (state: AdmininistrationState) => state.administrators
);
