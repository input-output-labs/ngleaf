import { administrationReducer } from './administration';
import { sessionReducer } from './session/session.reducers';

export const leafCoreStore = {
    session: sessionReducer,
    administration: administrationReducer
};
