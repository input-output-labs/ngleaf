import { createSelector } from '@ngrx/store';
import { SponsoringState } from './sponsoring.state';

interface AppState {
  sponsoring: SponsoringState;
}

const selectSponsoringFromAppState = (state: AppState) => state.sponsoring;

export const selectSponsoringState = createSelector(
  selectSponsoringFromAppState,
 (state: SponsoringState) => state
);
export const selectSetSponsor = createSelector(
  selectSponsoringFromAppState,
  (state: SponsoringState) => state.setSponsor
);
export const selectSponsoringProfiles = createSelector(
  selectSponsoringFromAppState,
  (state: SponsoringState) => state.sponsoringProfiles
);
export const selectSponsorCode = createSelector(
  selectSponsoringFromAppState,
  (state: SponsoringState) => state.sponsorCode
);
