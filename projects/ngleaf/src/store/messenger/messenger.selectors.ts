import { createSelector } from '@ngrx/store';
import { AsyncType } from '../common/index';
import { MessengerState } from './messenger.state';
import { LeafRoomModel } from '../../api/models/messenger.model';

interface AppState {
  messenger: MessengerState;
}

const selectMessengerFromAppState = (state: AppState) => state.messenger;

export const selectMessengerState = createSelector(
  selectMessengerFromAppState,
 (state: MessengerState) => state
);
export const selectRoomCreation = createSelector(
  selectMessengerFromAppState,
  (state: MessengerState) => state.roomCreation
);
export const selectRoomCreationData = createSelector(
  selectRoomCreation,
  (statistics: AsyncType<LeafRoomModel>) => statistics.data
);
