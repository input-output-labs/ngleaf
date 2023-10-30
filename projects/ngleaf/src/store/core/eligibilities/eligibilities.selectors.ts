import { createSelector } from '@ngrx/store';
import { EligibilitiesState } from './eligibilities.state';
import { AsyncType } from '../../common';
import { LeafEligibilities } from '../../../api/models/leaf-eligilibities';

interface AppState {
  eligibilities: EligibilitiesState;
}

const selectStatisticsFromAppState = (state: AppState) => state.eligibilities;

export const selectEligibilitiesState = createSelector(
  selectStatisticsFromAppState,
 (state: EligibilitiesState) => state
);
export const selectAsyncEligibilities = createSelector(
  selectStatisticsFromAppState,
  (state: EligibilitiesState) => state.eligibilities
);
export const selectEligibilities = createSelector(
  selectAsyncEligibilities,
  (eligibilities: AsyncType<LeafEligibilities>) => eligibilities.data
);
export const selectEligibility = (eligibilityKey: string) => createSelector(
  selectEligibilities,
  (eligibilities) => eligibilities && eligibilities[eligibilityKey]
);
