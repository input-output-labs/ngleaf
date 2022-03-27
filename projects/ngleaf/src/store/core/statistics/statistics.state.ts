import { LeafStatistic } from '../../../api/models/leaf-statistic.model';
import { AsyncType } from '../../common/index';

export interface StatisticsState {
  statistics: AsyncType<LeafStatistic[]>;
}
