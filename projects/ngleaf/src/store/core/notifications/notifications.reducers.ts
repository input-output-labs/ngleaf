import { createReducer, on } from '@ngrx/store';
import { upsertNotifications} from './notifications.actions';
import { NotificationState } from './notifications.state';

const initialState: NotificationState = {
    notifications: []
};

export function notificationReducer(reducerState, action): NotificationState {
  return createReducer(
    initialState,
    on(upsertNotifications, (state: NotificationState, {notifications}) => {
      const upsertedNotifications = [...state.notifications];
      notifications.forEach((notification) => {
        const index = state.notifications.findIndex(n => n.id === notification.id);
        if (index >= 0) {
          upsertedNotifications[index] = notification;
        } else {
          upsertedNotifications.push(notification);
        }
      });
      return ({...state, notifications: upsertedNotifications});
    })
  )(reducerState, action);
}
