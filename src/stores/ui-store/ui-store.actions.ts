import { createAction, props } from "@ngrx/store";

export const setMenuExpanded = createAction(
  "[Ui store] Set menu expanded",
  props<{ menuExpanded: boolean }>()
);
