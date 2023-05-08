import { administrationReducer } from './administration/administration.reducers';
import { emailingReducer } from './emailing/emailing.reducers';
import { notificationReducer } from './notifications/notifications.reducers';
import { sessionReducer } from './session/session.reducers';
import { statisticsReducer } from './statistics/statistics.reducers';

export const leafCoreStore = {
    administration: administrationReducer,
    notification: notificationReducer,
    session: sessionReducer,
    statistics: statisticsReducer,
    emailing: emailingReducer
};
