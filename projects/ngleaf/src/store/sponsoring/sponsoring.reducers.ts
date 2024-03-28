import { createReducer, on } from '@ngrx/store';
import { asyncTypeFailure, asyncTypeSuccess, createAsyncTypeFromCall, createEmptyAsyncType } from '../common/index';
import { resetSponsoring, setSetSponsorCall, setSetSponsorSuccess, setSetSponsorFailure, setSponsoringProfilesFailure, setSponsoringProfilesSuccess, setSponsoringProfilesCall, setSponsorCode, setUpdateSponsorCodeCall, setUpdateSponsorCodeSuccess, setUpdateSponsorCodeFailure } from './sponsoring.actions';
import { SponsoringState } from './sponsoring.state';

const initialState: SponsoringState = {
  setSponsor: createEmptyAsyncType(),
  sponsoringProfiles: createEmptyAsyncType(),
  updateSponsorCode: createEmptyAsyncType(),
};

export function sponsoringReducer(reducerState, action): SponsoringState {
  return createReducer(
    initialState,
    /** Current Account */
    on(resetSponsoring, (_state: SponsoringState) => ({...initialState})),
    on(setSetSponsorCall, (state: SponsoringState, {call}) => ({...state, setSponsor: createAsyncTypeFromCall()})),
    on(setSetSponsorSuccess, (state: SponsoringState, {data}) => ({...state, setSponsor: asyncTypeSuccess(state.setSponsor, data)})),
    on(setSetSponsorFailure, (state: SponsoringState, {error}) => ({...state, setSponsor: asyncTypeFailure(state.setSponsor, error)})),
    /** Update sponsor code */
    on(setUpdateSponsorCodeCall, (state: SponsoringState, {call}) => ({...state, updateSponsorCode: createAsyncTypeFromCall()})),
    on(setUpdateSponsorCodeSuccess, (state: SponsoringState, {data}) => ({...state, updateSponsorCode: asyncTypeSuccess(state.updateSponsorCode, data)})),
    on(setUpdateSponsorCodeFailure, (state: SponsoringState, {error}) => ({...state, updateSponsorCode: asyncTypeFailure(state.updateSponsorCode, error)})),
    /** Sponsoring Profile */
    on(setSponsoringProfilesCall, (state: SponsoringState, {call}) => ({...state, sponsoringProfiles: createAsyncTypeFromCall()})),
    on(setSponsoringProfilesSuccess, (state: SponsoringState, {data}) => ({...state, sponsoringProfiles: asyncTypeSuccess(state.sponsoringProfiles, data)})),
    on(setSponsoringProfilesFailure, (state: SponsoringState, {error}) => ({...state, sponsoringProfiles: asyncTypeFailure(state.sponsoringProfiles, error)})),
    /** Sponsor code */
    on(setSponsorCode, (state: SponsoringState, {sponsorCode}) => ({...state, sponsorCode})),
  )(reducerState, action);
}
