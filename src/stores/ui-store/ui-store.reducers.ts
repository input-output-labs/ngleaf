import { createReducer, on } from "@ngrx/store";
import { UiState } from "./ui-store.state";
import * as UiActions from "./ui-store.actions";

const initialState: UiState = {
  menuExpanded: true,
};

export function uiReducer(reducerState, action): UiState {
  return createReducer(
    initialState,
    on(UiActions.setMenuExpanded, (state: UiState, payload: { menuExpanded: boolean }) => ({
      ...state,
      menuExpanded: payload.menuExpanded,
    })),
  )(reducerState, action);
}
