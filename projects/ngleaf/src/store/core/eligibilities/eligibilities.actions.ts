import { createAction, props } from '@ngrx/store';
import { LeafEligibilities } from '../../../api/models/leaf-eligilibities';
import { Observable } from 'rxjs';

export const fetchEligibilites = createAction(
  '[Eligibilities store] Fetch eligibilities',
);
export const fetchEligibilitesCall = createAction(
  '[Eligibilities store] Fetch eligibilities call',
  props<{call: Observable<LeafEligibilities>}>()
);
export const fetchEligibilitesSuccess = createAction(
  '[Eligibilities store] Fetch eligibilities success',
  props<{data: LeafEligibilities}>()
);
export const fetchEligibilitesFailure = createAction(
  '[Eligibilities store] Fetch eligibilities failure',
  props<{error: any}>()
);
