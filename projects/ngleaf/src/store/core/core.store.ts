import { administrationReducer } from './administration/administration.reducers';
import { notificationReducer } from './notification/notification.reducers';
import { sessionReducer } from './session/session.reducers';
import { statisticsReducer } from './statistics/statistics.reducers';

export const leafCoreStore = {
    administration: administrationReducer,
    notification: notificationReducer,
    session: sessionReducer,
    statistics: statisticsReducer
};
