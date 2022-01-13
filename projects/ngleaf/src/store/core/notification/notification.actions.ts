import { createAction, props } from '@ngrx/store';
import { LeafNotificationModel } from '../../../models/index';

export const emitNotification = createAction(
    '[Nofitication store] Emit notification',
    props<{notification: LeafNotificationModel | null}>()
);
