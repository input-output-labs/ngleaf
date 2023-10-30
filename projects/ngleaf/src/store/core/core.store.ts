import { administrationReducer } from './administration/administration.reducers';
import { eligibilitiesReducer } from './eligibilities/eligibilities.reducers';
import { emailingReducer } from './emailing/emailing.reducers';
import { notificationReducer } from './notifications/notifications.reducers';
import { organizationsReducer } from './organizations';
import { sessionReducer } from './session/session.reducers';
import { statisticsReducer } from './statistics/statistics.reducers';

export const leafCoreStore = {
    administration: administrationReducer,
    notification: notificationReducer,
    session: sessionReducer,
    statistics: statisticsReducer,
    emailing: emailingReducer,
    organizations: organizationsReducer,
    eligibilities: eligibilitiesReducer,
};
