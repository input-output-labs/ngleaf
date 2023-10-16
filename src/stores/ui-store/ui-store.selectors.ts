import { createSelector } from "@ngrx/store";
import { UiState } from "./ui-store.state";

interface AppState {
  ui: UiState;
}

const selectUiFromAppState = (state: AppState) => state.ui;

export const selectUiState = createSelector(
  selectUiFromAppState,
  (state: UiState) => state
);

export const selectMenuExpanded = createSelector(
  selectUiState,
  (state: UiState) => state.menuExpanded
);
