import { createAction, props } from '@ngrx/store';
import { LeafNotificationModel } from "../../../api/models/notifications.model";
import { Observable } from 'rxjs';

export const fetchNotifications = createAction(
    '[Nofitications store] Fetch notifications'
);

export const fetchNotificationsCall = createAction(
  '[Nofitications store] Fetch notifications call',
  props<{call: Observable<LeafNotificationModel[]>}>()
);

export const upsertNotifications = createAction(
    '[Nofitications store] Emit notification',
    props<{notifications: LeafNotificationModel[]}>()
);

export const setNotificationsAsSeen = createAction(
    '[Nofitications store] Set notifications as seen',
    props<{notifications: LeafNotificationModel[]}>()
);
