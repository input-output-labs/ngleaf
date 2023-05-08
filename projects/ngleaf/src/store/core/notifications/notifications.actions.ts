import { createAction, props } from '@ngrx/store';
import { LeafNotificationModel } from "../../../api/models/notifications.model";

export const fetchNotifications = createAction(
    '[Nofitications store] Fetch notifications'
);

export const upsertNotifications = createAction(
    '[Nofitications store] Emit notification',
    props<{notifications: LeafNotificationModel[]}>()
);

export const setNotificationsAsSeen = createAction(
    '[Nofitications store] Set notifications as seen',
    props<{notifications: LeafNotificationModel[]}>()
);
