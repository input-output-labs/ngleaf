import { LeafInvoice, LeafPaymentPlan, LeafPaymentPlanInfo, LeafService } from '../../api';
import { AsyncType } from '../common/index';

export interface PaymentState {
  plans: AsyncType<LeafPaymentPlan[]>;
  selectPaymentPlan: AsyncType<LeafPaymentPlan>;
  selectedPaymentPlanInfo: AsyncType<LeafPaymentPlanInfo>;
  invoices: AsyncType<LeafInvoice[]>;
  /* Services */
  createService: AsyncType<LeafService>;
  updateService: AsyncType<LeafService>;
  deleteService: AsyncType<LeafService>;
  allServices: AsyncType<LeafService[]>;
}
