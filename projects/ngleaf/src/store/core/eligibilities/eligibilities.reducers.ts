import { createReducer, on } from '@ngrx/store';
import { asyncTypeFailure, asyncTypeSuccess, asyncTypePending, createEmptyAsyncType } from '../../common/index';
import * as Actions from './eligibilities.actions';
import { EligibilitiesState } from './eligibilities.state';

const initialState: EligibilitiesState = {
  eligibilities: createEmptyAsyncType(),
};

export function eligibilitiesReducer(reducerState, action): EligibilitiesState {
  return createReducer(
    initialState,
    /** Current Account */
    on(Actions.fetchEligibilites, (state: EligibilitiesState, {}) => ({...state, eligibilities: asyncTypePending(state.eligibilities)})),
    on(Actions.fetchEligibilitesSuccess, (state: EligibilitiesState, {data}) => ({...state, eligibilities: asyncTypeSuccess(state.eligibilities, data)})),
    on(Actions.fetchEligibilitesFailure, (state: EligibilitiesState, {error}) => ({...state, eligibilities: asyncTypeFailure(state.eligibilities, error)}))
  )(reducerState, action);
}
