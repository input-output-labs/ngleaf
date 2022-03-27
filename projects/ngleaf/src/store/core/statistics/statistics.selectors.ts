import { createSelector } from '@ngrx/store';
import { AsyncType } from '../../common/index';
import { LeafStatistic } from '../../../api/models/index';
import { StatisticsState } from './statistics.state';

interface AppState {
  statistics: StatisticsState;
}

const selectStatisticsFromAppState = (state: AppState) => state.statistics;

export const selectStatisticsState = createSelector(
  selectStatisticsFromAppState,
 (state: StatisticsState) => state
);
export const selectStatistics = createSelector(
  selectStatisticsFromAppState,
  (state: StatisticsState) => state.statistics
);
export const selectStatisticsData = createSelector(
  selectStatistics,
  (statistics: AsyncType<LeafStatistic[]>) => statistics.data
);
