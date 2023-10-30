import { createAction, props } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LeafEligibilities } from '../../../api/models/leaf-eligilibities';

export const fetchEligibilites = createAction(
  '[Eligibilities store] Fetch eligibilities',
);
export const fetchEligibilitesSuccess = createAction(
  '[Eligibilities store] Fetch eligibilities success',
  props<{data: LeafEligibilities}>()
);
export const fetchEligibilitesFailure = createAction(
  '[Eligibilities store] Fetch eligibilities failure',
  props<{error: any}>()
);
