import { createReducer, on } from '@ngrx/store';
import { asyncTypeFailure, asyncTypeSuccess, createAsyncTypeFromCall, createEmptyAsyncType } from '../common/index';
import { resetMessenger, setRoomCreationCall, setRoomCreationSuccess, setRoomCreationFailure } from './messenger.actions';
import { MessengerState } from './messenger.state';

const initialState: MessengerState = {
  roomCreation: createEmptyAsyncType(),
};

export function messengerReducer(reducerState, action): MessengerState {
  return createReducer(
    initialState,
    /** Current Account */
    on(resetMessenger, (state: MessengerState) => ({...initialState})),
    on(setRoomCreationCall, (state: MessengerState, {call}) => ({...state, roomCreation: createAsyncTypeFromCall()})),
    on(setRoomCreationSuccess, (state: MessengerState, {data}) => ({...state, roomCreation: asyncTypeSuccess(state.roomCreation, data)})),
    on(setRoomCreationFailure, (state: MessengerState, {error}) => ({...state, roomCreation: asyncTypeFailure(state.roomCreation, error)}))
  )(reducerState, action);
}
