import { LeafPaymentPlan, LeafPaymentPlanInfo } from '../../api';
import { AsyncType } from '../common/index';

export interface PaymentState {
  plans: AsyncType<LeafPaymentPlan[]>;
  selectPaymentPlan: AsyncType<LeafPaymentPlan>;
  selectedPaymentPlanInfo: AsyncType<LeafPaymentPlanInfo>;
}
