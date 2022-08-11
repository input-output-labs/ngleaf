import { LeafRoomModel } from '../../../api/models/messenger.model';
import { LeafAnalyticEvent } from '../../../models/leaf-analytics-event.model';
import { AsyncType } from '../../common/index';

export interface AnalyticsState {
  events: LeafAnalyticEvent[];
  pushEvents: AsyncType<void>;
}
