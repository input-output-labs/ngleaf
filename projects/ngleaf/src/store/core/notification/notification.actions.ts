import { createAction, props } from '@ngrx/store';
import { LeafNotificationModel } from '../../../models/leaf-notification.model';

export const emitNotification = createAction(
    '[Nofitication store] Emit notification',
    props<{notification: LeafNotificationModel | null}>()
);
