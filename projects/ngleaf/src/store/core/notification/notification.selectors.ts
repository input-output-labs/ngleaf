import { createSelector } from '@ngrx/store';
import { NotificationState } from './notification.state';

interface AppState {
  notification: NotificationState;
}

const selectNotification = (state: AppState) => state.notification;

export const selectNotifications = createSelector(
  selectNotification,
  (state: NotificationState) => state.notifications
);
