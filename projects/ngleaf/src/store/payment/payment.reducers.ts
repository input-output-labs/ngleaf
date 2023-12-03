import { createReducer, on } from '@ngrx/store';
import { asyncTypeFailure, asyncTypePending, asyncTypeSuccess, createAsyncTypeFromCall, createEmptyAsyncType } from '../common/index';
import * as PaymentActions from './payment.actions';
import { PaymentState } from './payment.state';

const initialState: PaymentState = {
  plans: createEmptyAsyncType([
    {
      name: "Free",
      color: "lightgrey",
      features: [
        {
          name: "userCount",
          type: "number",
          value: "1"
        },
        {
          name: "cardCount",
          type: "number",
          value: "1"
        },
        {
          name: "reporting",
          type: "boolean",
          value: "false"
        }
      ],
      pricing: {
        free: true
      }
    },
    {
      name: "Basic",
      color: "lightblue",
      features: [
        {
          name: "userCount",
          type: "number",
          value: "5"
        },
        {
          name: "cardCount",
          type: "number",
          value: "5"
        },
        {
          name: "reporting",
          type: "boolean",
          value: "true"
        }
      ],
      pricing: {
        price: 4.99,
        period: "month"
      }
    },
    {
      name: "Pro",
      color: "lightcoral",
      features: [
        {
          name: "userCount",
          type: "number",
          value: "unlimited"
        },
        {
          name: "cardCount",
          type: "number",
          value: "unlimited"
        },
        {
          name: "reporting",
          type: "boolean",
          value: "true"
        }
      ],
      pricing: {
        price: 69.99,
        period: "year"
      }
    }
  ]),
  selectPaymentPlan: createEmptyAsyncType(),
  selectedPaymentPlanInfo: createEmptyAsyncType(),
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
  )(reducerState, action);
}

