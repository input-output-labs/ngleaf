import { createSelector } from '@ngrx/store';
import { AsyncType } from '../common/index';
import { PaymentState } from './payment.state';
import { LeafPaymentPlan, LeafPaymentPlanInfo, LeafService, PlanAttachment } from '../../api';
import { selectCurrentOrganizationId } from '../core/organizations/organizations.selectors';

interface AppState {
  payment: PaymentState;
  organizations: any; // OrganizationsState
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

export const selectInvoices = createSelector(
  selectPaymentFromAppState,
  (state: PaymentState) => state.invoices
);

/* Services Selectors */
export const selectAllServices = createSelector(
  selectPaymentFromAppState,
  (state: PaymentState) => state.allServices
);

/* Services Selectors */
export const selectAllServicesData = createSelector(
  selectPaymentFromAppState,
  (state: PaymentState) => state.allServices?.data
);

export const selectCurrentOrganizationServices = createSelector(
  selectAllServicesData,
  selectCurrentOrganizationId,
  (allServices: LeafService[] | undefined, currentOrganizationId: string) => {
    const allServicesData = allServices || [];
    if (!allServicesData || !currentOrganizationId) {
      return [];
    }
    return allServicesData.filter(service => 
      service.attachmentType === PlanAttachment.ORGANIZATION && 
      service.attachedTo === currentOrganizationId
    );
  }
);

export const selectCreateService = createSelector(
  selectPaymentFromAppState,
  (state: PaymentState) => state.createService
);

export const selectUpdateService = createSelector(
  selectPaymentFromAppState,
  (state: PaymentState) => state.updateService
);

export const selectDeleteService = createSelector(
  selectPaymentFromAppState,
  (state: PaymentState) => state.deleteService
);

export const selectAvailableServices = createSelector(
  selectPaymentFromAppState,
  (state: PaymentState) => state.availableServices
);

export const selectAvailableServicesData = createSelector(
  selectAvailableServices,
  (availableServices: AsyncType<LeafService[]>) => availableServices?.data
);
