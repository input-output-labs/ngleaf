import { createSelector } from '@ngrx/store';
import { NotificationState } from './notification.state';

interface AppState {
  notification: NotificationState;
}

export const notificationSession = (state: AppState) => state.notification;

export const selectNotifications = createSelector(
  notificationSession,
  (state: NotificationState) => state.notifications
);
