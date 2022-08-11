import { createReducer, on } from "@ngrx/store";
import {
  asyncTypeFailure,
  asyncTypeSuccess,
  createAsyncTypeFromCall,
  createEmptyAsyncType,
} from "../../common/index";
import {
  resetAnalytics,
  setPushEventsCall,
  setPushEventsSuccess,
  setPushEventsFailure,
  pushEvent,
} from "./analytics.actions";
import { AnalyticsState } from "./analytics.state";

const initialState: AnalyticsState = {
  events: [],
  pushEvents: createEmptyAsyncType(),
};

export function analyticsReducer(reducerState, action): AnalyticsState {
  return createReducer(
    initialState,
    /** Current Account */
    on(resetAnalytics, (state: AnalyticsState) => ({ ...initialState })),
    on(pushEvent, (state: AnalyticsState, { event }) => {
      const events = [...state.events, event];
      return { ...state, events };
    }),
    on(setPushEventsCall, (state: AnalyticsState, { call }) => ({
      ...state,
      pushEvents: createAsyncTypeFromCall(call),
    })),
    on(setPushEventsSuccess, (state: AnalyticsState) => ({
      ...state,
      pushEvents: asyncTypeSuccess(state.pushEvents),
    })),
    on(setPushEventsFailure, (state: AnalyticsState, { error }) => ({
      ...state,
      pushEvents: asyncTypeFailure(state.pushEvents, error),
    }))
  )(reducerState, action);
}
