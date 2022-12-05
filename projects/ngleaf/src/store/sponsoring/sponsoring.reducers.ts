import { createReducer, on } from '@ngrx/store';
import { asyncTypeFailure, asyncTypeSuccess, createAsyncTypeFromCall, createEmptyAsyncType } from '../common/index';
import { resetSponsoring, setSetSponsorCall, setSetSponsorSuccess, setSetSponsorFailure, setSponsoringProfilesFailure, setSponsoringProfilesSuccess, setSponsoringProfilesCall, setSponsorCode } from './sponsoring.actions';
import { SponsoringState } from './sponsoring.state';

const initialState: SponsoringState = {
  setSponsor: createEmptyAsyncType(),
  sponsoringProfiles: createEmptyAsyncType(),
};

export function sponsoringReducer(reducerState, action): SponsoringState {
  return createReducer(
    initialState,
    /** Current Account */
    on(resetSponsoring, (_state: SponsoringState) => ({...initialState})),
    on(setSetSponsorCall, (state: SponsoringState, {call}) => ({...state, setSponsor: createAsyncTypeFromCall(call)})),
    on(setSetSponsorSuccess, (state: SponsoringState, {data}) => ({...state, setSponsor: asyncTypeSuccess(state.setSponsor, data)})),
    on(setSetSponsorFailure, (state: SponsoringState, {error}) => ({...state, setSponsor: asyncTypeFailure(state.setSponsor, error)})),
    /** Sponsoring Profile */
    on(setSponsoringProfilesCall, (state: SponsoringState, {call}) => ({...state, sponsoringProfiles: createAsyncTypeFromCall(call)})),
    on(setSponsoringProfilesSuccess, (state: SponsoringState, {data}) => ({...state, sponsoringProfiles: asyncTypeSuccess(state.sponsoringProfiles, data)})),
    on(setSponsoringProfilesFailure, (state: SponsoringState, {error}) => ({...state, sponsoringProfiles: asyncTypeFailure(state.sponsoringProfiles, error)})),
    /** Sponsor code */
    on(setSponsorCode, (state: SponsoringState, {sponsorCode}) => ({...state, sponsorCode})),
  )(reducerState, action);
}
