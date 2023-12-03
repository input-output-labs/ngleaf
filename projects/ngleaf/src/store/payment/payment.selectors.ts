import { createSelector } from '@ngrx/store';
import { AsyncType } from '../common/index';
import { PaymentState } from './payment.state';
import { LeafPaymentPlan, LeafPaymentPlanInfo } from '../../api';

interface AppState {
  payment: PaymentState;
}

const selectPaymentFromAppState = (state: AppState) => state.payment;

export const selectPaymentState = createSelector(
  selectPaymentFromAppState,
 (state: PaymentState) => state
);
export const selectPlans = createSelector(
  selectPaymentFromAppState,
  (state: PaymentState) => state.plans
);
export const selectSelectPaymentPlan = createSelector(
  selectPaymentFromAppState,
  (state: PaymentState) => state.selectPaymentPlan
);
export const selectPlansData = createSelector(
  selectPlans,
  (plans: AsyncType<LeafPaymentPlan[]>) => plans.data
);
export const selectSelectedPaymentPlanInfo = createSelector(
  selectPaymentFromAppState,
  (state: PaymentState) => state.selectedPaymentPlanInfo
);

