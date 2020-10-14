import { createReducer, on } from '@ngrx/store';
import { emitNotification} from './notification.actions';
import { NotificationState } from './notification.state';

const initialState: NotificationState = {
    notifications: null
};

export function notificationReducer(reducerState, action): NotificationState {
  return createReducer(
    initialState,
    on(emitNotification, (state: NotificationState, {notification}) => ({...state, notifications: notification}))
  )(reducerState, action);
}
