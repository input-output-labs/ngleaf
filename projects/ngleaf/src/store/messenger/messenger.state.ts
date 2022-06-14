import { LeafRoomModel } from '../../api/models/messenger.model';
import { AsyncType } from '../common/index';

export interface MessengerState {
  roomCreation: AsyncType<LeafRoomModel>;
}
