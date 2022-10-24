import { createSelector } from '@ngrx/store';
import { EmailingState } from './emailing.state';

interface AppState {
  emailing: EmailingState;
}

const selectEmailingFromAppState = (state: AppState) => state.emailing;

export const selectEmailingState = createSelector(
  selectEmailingFromAppState,
 (state: EmailingState) => state
);
export const selectEmailingCategories = createSelector(
  selectEmailingFromAppState,
  (state: EmailingState) => state.categories
);
export const selectEmailingCategoryAction = createSelector(
  selectEmailingFromAppState,
  (state: EmailingState) => state.categoryAction
);
export const selectTestEmailBatch = createSelector(
  selectEmailingFromAppState,
  (state: EmailingState) => state.testEmailBatch
);
export const selectEmailBatch = createSelector(
  selectEmailingFromAppState,
  (state: EmailingState) => state.emailBatch
);
