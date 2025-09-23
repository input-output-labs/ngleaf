import { createReducer, on } from '@ngrx/store';
import { asyncTypeFailure, asyncTypePending, asyncTypeSuccess, createAsyncTypeFromCall, createEmptyAsyncType, asyncRemove, asyncUpsert } from '../common/index';
import * as PaymentActions from './payment.actions';
import { PaymentState } from './payment.state';

const initialState: PaymentState = {
  plans: createEmptyAsyncType(),
  selectPaymentPlan: createEmptyAsyncType(),
  selectedPaymentPlanInfo: createEmptyAsyncType(),
  invoices: createEmptyAsyncType(),
  /* Services */
  createService: createEmptyAsyncType(),
  updateService: createEmptyAsyncType(),
  deleteService: createEmptyAsyncType(),
  allServices: createEmptyAsyncType(),
};

export function paymentReducer(reducerState, action): PaymentState {
  return createReducer(
    initialState,
    /** Fetch plans */
    on(PaymentActions.fetchPlans, (state: PaymentState) => ({...state, plans: asyncTypePending(state.plans)})),
    on(PaymentActions.fetchPlansSuccess, (state: PaymentState, {data}) => ({...state, plans: asyncTypeSuccess(state.plans, data)})),
    on(PaymentActions.fetchPlansFailure, (state: PaymentState, {error}) => ({...state, plans: asyncTypeFailure(state.plans, error)})),
    /** Select payment plan */
    on(PaymentActions.selectPaymentPlan, (state: PaymentState) => ({...state, selectPaymentPlan: asyncTypePending(state.selectPaymentPlan)})),
    on(PaymentActions.selectPaymentPlanSuccess, (state: PaymentState, {data}) => ({...state, selectPaymentPlan: asyncTypeSuccess(state.selectPaymentPlan, data)})),
    on(PaymentActions.selectPaymentPlanFailure, (state: PaymentState, {error}) => ({...state, selectPaymentPlan: asyncTypeFailure(state.selectPaymentPlan, error)})),
    /** Fetch selected payment plan info */
    on(PaymentActions.fetchSelectedPaymentPlanInfo, (state: PaymentState) => ({...state, selectedPaymentPlanInfo: asyncTypePending(state.selectedPaymentPlanInfo)})),
    on(PaymentActions.fetchSelectedPaymentPlanInfoSuccess, (state: PaymentState, {data}) => ({...state, selectedPaymentPlanInfo: asyncTypeSuccess(state.selectedPaymentPlanInfo, data)})),
    on(PaymentActions.fetchSelectedPaymentPlanInfoFailure, (state: PaymentState, {error}) => ({...state, selectedPaymentPlanInfo: asyncTypeFailure(state.selectedPaymentPlanInfo, error)})),
    /** Fetch invoices */
    on(PaymentActions.fetchInvoices, (state: PaymentState) => ({...state, invoices: asyncTypePending(state.invoices)})),
    on(PaymentActions.fetchInvoicesSuccess, (state: PaymentState, {data}) => ({...state, invoices: asyncTypeSuccess(state.invoices, data)})),
    on(PaymentActions.fetchInvoicesFailure, (state: PaymentState, {error}) => ({...state, invoices: asyncTypeFailure(state.invoices, error)})),
    /** Services */
    /** Create service */
    on(PaymentActions.setCreateServiceCall, (state: PaymentState, {call}) => ({...state, createService: asyncTypePending(state.createService)})),
    on(PaymentActions.setCreateServiceSuccess, (state: PaymentState, {data}) => ({
      ...state,
      createService: asyncTypeSuccess(state.createService, data),
      allServices: asyncUpsert(data, state.allServices)
    })),
    on(PaymentActions.setCreateServiceFailure, (state: PaymentState, {error}) => ({...state, createService: asyncTypeFailure(state.createService, error)})),
    /** Update service */
    on(PaymentActions.setUpdateServiceCall, (state: PaymentState, {call}) => ({...state, updateService: asyncTypePending(state.updateService)})),
    on(PaymentActions.setUpdateServiceSuccess, (state: PaymentState, {data}) => ({
      ...state, 
      updateService: asyncTypeSuccess(state.updateService, data),
      allServices: asyncUpsert(data, state.allServices)
    })),
    on(PaymentActions.setUpdateServiceFailure, (state: PaymentState, {error}) => ({...state, updateService: asyncTypeFailure(state.updateService, error)})),
    /** Delete service */
    on(PaymentActions.deleteService, (state: PaymentState) => ({...state, deleteService: asyncTypePending(state.deleteService)})),
    on(PaymentActions.setDeleteServiceSuccess, (state: PaymentState, {data}) => ({
      ...state, 
      deleteService: asyncTypeSuccess(state.deleteService, data),
      allServices: asyncRemove(data.id!, state.allServices)
    })),
    on(PaymentActions.setDeleteServiceFailure, (state: PaymentState, {error}) => ({...state, deleteService: asyncTypeFailure(state.deleteService, error)})),
    /** List organization services */
    on(PaymentActions.setListOrganizationServicesCall, (state: PaymentState, {call}) => ({...state, allServices: asyncTypePending(state.allServices)})),
    on(PaymentActions.setListOrganizationServicesSuccess, (state: PaymentState, {data}) => ({...state, allServices: asyncTypeSuccess(state.allServices, data)})),
    on(PaymentActions.setListOrganizationServicesFailure, (state: PaymentState, {error}) => ({...state, allServices: asyncTypeFailure(state.allServices, error)})),
  )(reducerState, action);
}

