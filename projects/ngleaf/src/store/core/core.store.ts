import { administrationReducer } from './administration/administration.reducers';
import { notificationReducer } from './notification/notification.reducers';
import { sessionReducer } from './session/session.reducers';

export const leafCoreStore = {
    administration: administrationReducer,
    notification: notificationReducer,
    session: sessionReducer
};
