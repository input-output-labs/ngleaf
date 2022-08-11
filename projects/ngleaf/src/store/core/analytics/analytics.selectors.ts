import { createSelector } from '@ngrx/store';
import { AnalyticsState } from './analytics.state';

interface AppState {
  analytics: AnalyticsState;
}

const selectMessengerFromAppState = (state: AppState) => state.analytics;

export const selectMessengerState = createSelector(
  selectMessengerFromAppState,
 (state: AnalyticsState) => state
);
export const selectEvents = createSelector(
  selectMessengerFromAppState,
  (state: AnalyticsState) => state.events
);
export const selectPushEvents = createSelector(
  selectMessengerFromAppState,
  (state: AnalyticsState) => state.pushEvents
);
