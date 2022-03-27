import { createAction, props } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LeafStatistic } from '../../../api/models/index';

export const resetStatistics = createAction(
  '[Statistics store] Reset statistics'
);
export const setStatisticsCall = createAction(
  '[Statistics store] Set statistics call',
  props<{call: Observable<LeafStatistic[]>}>()
);
export const setStatisticsSuccess = createAction(
  '[Statistics store] Set statistics success',
  props<{data: LeafStatistic[]}>()
);
export const setStatisticsFailure = createAction(
  '[Statistics store] Set statistics failure',
  props<{error: any}>()
);
