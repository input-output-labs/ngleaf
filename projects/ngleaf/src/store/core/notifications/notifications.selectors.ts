import { createSelector } from '@ngrx/store';
import { NotificationState } from './notifications.state';
import { LeafNotificationModel } from '../../../api/models/notifications.model';

interface AppState {
  notification: NotificationState;
}

const selectNotification = (state: AppState) => state.notification;

export const selectNotifications = createSelector(
  selectNotification,
  (state: NotificationState) => state.notifications
);

export const selectUnseenNotifications = createSelector(
  selectNotifications,
  (notifications: LeafNotificationModel[]) => notifications.filter((notification: LeafNotificationModel) => notification.channelSendingStatus.UI === 'CREATED')
);

export const selectNotificationsCount = createSelector(
  selectNotifications,
  (notifications: LeafNotificationModel[]) => notifications.length
);

export const selectUnseenNotificationsCount = createSelector(
  selectUnseenNotifications,
  (unseenNotifications: LeafNotificationModel[]) => unseenNotifications.length
);
