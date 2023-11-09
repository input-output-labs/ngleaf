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
};

export function paymentReducer(reducerState, action): PaymentState {
  return createReducer(
    initialState,
    /** Current Account */
    on(PaymentActions.fetchPlans, (state: PaymentState) => ({...state, plans: asyncTypePending(state.plans)})),
    on(PaymentActions.fetchPlansSuccess, (state: PaymentState, {data}) => ({...state, plans: asyncTypeSuccess(state.plans, data)})),
    on(PaymentActions.fetchPlansFailure, (state: PaymentState, {error}) => ({...state, plans: asyncTypeFailure(state.plans, error)}))
  )(reducerState, action);
}
