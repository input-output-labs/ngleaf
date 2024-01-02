import { createReducer, on } from '@ngrx/store';
import { asyncTypeFailure, asyncTypePending, asyncTypeSuccess, createAsyncTypeFromCall, createEmptyAsyncType } from '../common/index';
import * as PaymentActions from './payment.actions';
import { PaymentState } from './payment.state';

const initialState: PaymentState = {
  plans: createEmptyAsyncType(),
  selectPaymentPlan: createEmptyAsyncType(),
  selectedPaymentPlanInfo: createEmptyAsyncType(),
  invoices: createEmptyAsyncType(),
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
  )(reducerState, action);
}

