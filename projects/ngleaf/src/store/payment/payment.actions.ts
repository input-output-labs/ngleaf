import { createAction, props } from '@ngrx/store';
import { LeafPaymentPlan, LeafPaymentPlanInfo } from '../../api';

export const fetchPlans = createAction(
  '[Payment store] Fetch plan',
);
export const fetchPlansSuccess = createAction(
  '[Payment store] Fetch plan success',
  props<{data: LeafPaymentPlan[]}>()
);
export const fetchPlansFailure = createAction(
  '[Payment store] Fetch plan failure',
  props<{error: any}>()
);

export const fetchSelectedPaymentPlanInfo = createAction(
  '[Payment store] Fetch selected payment plan info',
);
export const fetchSelectedPaymentPlanInfoSuccess = createAction(
  '[Payment store] Fetch selected payment plan info success',
  props<{data: LeafPaymentPlanInfo}>()
);
export const fetchSelectedPaymentPlanInfoFailure = createAction(
  '[Payment store] Fetch selected payment plan info failure',
  props<{error: any}>()
);

export const selectPaymentPlan = createAction(
  '[Payment store] Select plan',
  props<{selectedPlan: LeafPaymentPlan}>()
);
export const selectPaymentPlanSuccess = createAction(
  '[Payment store] Select plan success',
  props<{data: LeafPaymentPlan}>()
);
export const selectPaymentPlanFailure = createAction(
  '[Payment store] Select plan failure',
  props<{error: any}>()
);
