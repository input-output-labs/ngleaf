import { createAction, props } from '@ngrx/store';
import { LeafAnalyticEvent } from '../../../models/leaf-analytics-event.model';
import { Observable } from 'rxjs';

export const resetAnalytics = createAction(
  '[Analytics store] Reset statistics'
);
export const pushEvent = createAction(
  '[Analytics store] Push statistics',
  props<{event: LeafAnalyticEvent}>()
);
export const setPushEventsCall = createAction(
  '[Analytics store] Set pushEvents call',
  props<{call: Observable<void>}>()
);
export const setPushEventsSuccess = createAction(
  '[Analytics store] Set pushEvents success'
);
export const setPushEventsFailure = createAction(
  '[Analytics store] Set pushEvents failure',
  props<{error: any}>()
);
