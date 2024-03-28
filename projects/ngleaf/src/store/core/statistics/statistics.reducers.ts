import { createReducer, on } from '@ngrx/store';
import { asyncTypeFailure, asyncTypeSuccess, createAsyncTypeFromCall, createEmptyAsyncType } from '../../common/index';
import { resetStatistics, setStatisticsCall, setStatisticsFailure, setStatisticsSuccess } from './statistics.actions';
import { StatisticsState } from './statistics.state';

const initialState: StatisticsState = {
  statistics: createEmptyAsyncType(),
};

export function statisticsReducer(reducerState, action): StatisticsState {
  return createReducer(
    initialState,
    /** Current Account */
    on(resetStatistics, (state: StatisticsState) => ({...state, statistics: createEmptyAsyncType()})),
    on(setStatisticsCall, (state: StatisticsState, {call}) => ({...state, statistics: createAsyncTypeFromCall()})),
    on(setStatisticsSuccess, (state: StatisticsState, {data}) => ({...state, statistics: asyncTypeSuccess(state.statistics, data)})),
    on(setStatisticsFailure, (state: StatisticsState, {error}) => ({...state, statistics: asyncTypeFailure(state.statistics, error)}))
  )(reducerState, action);
}
