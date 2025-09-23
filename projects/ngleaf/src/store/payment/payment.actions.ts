import { createAction, props } from '@ngrx/store';
import { LeafInvoice, LeafPaymentPlan, LeafPaymentPlanInfo, LeafService } from '../../api';
import { Observable } from 'rxjs';

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

export const fetchInvoices = createAction(
  '[Payment store] Fetch invoices',
  props<{invoicesType: string}>()
);
export const fetchInvoicesSuccess = createAction(
  '[Payment store] Fetch invoices success',
  props<{data: LeafInvoice[]}>()
);
export const fetchInvoicesFailure = createAction(
  '[Payment store] Fetch invoices failure',
  props<{error: any}>()
);

/* Services Actions */
export const createService = createAction(
  '[Payment store] Create service',
  props<{service: LeafService}>()
);
export const setCreateServiceCall = createAction(
  '[Payment store] Set create service call',
  props<{call: Observable<LeafService>}>()
);
export const setCreateServiceSuccess = createAction(
  '[Payment store] Set create service success',
  props<{data: LeafService}>()
);
export const setCreateServiceFailure = createAction(
  '[Payment store] Set create service failure',
  props<{error: any}>()
);

export const updateService = createAction(
  '[Payment store] Update service',
  props<{id: string, service: LeafService}>()
);
export const setUpdateServiceCall = createAction(
  '[Payment store] Set update service call',
  props<{call: Observable<LeafService>}>()
);
export const setUpdateServiceSuccess = createAction(
  '[Payment store] Set update service success',
  props<{data: LeafService}>()
);
export const setUpdateServiceFailure = createAction(
  '[Payment store] Set update service failure',
  props<{error: any}>()
);

export const deleteService = createAction(
  '[Payment store] Delete service',
  props<{id: string}>()
);
export const setDeleteServiceSuccess = createAction(
  '[Payment store] Set delete service success',
  props<{data: LeafService}>()
);
export const setDeleteServiceFailure = createAction(
  '[Payment store] Set delete service failure',
  props<{error: any}>()
);

export const listOrganizationServices = createAction(
  '[Payment store] List organization services',
  props<{organizationId?: string}>()
);
export const setListOrganizationServicesCall = createAction(
  '[Payment store] Set list organization services call',
  props<{call: Observable<LeafService[]>}>()
);
export const setListOrganizationServicesSuccess = createAction(
  '[Payment store] Set list organization services success',
  props<{data: LeafService[]}>()
);
export const setListOrganizationServicesFailure = createAction(
  '[Payment store] Set list organization services failure',
  props<{error: any}>()
);
