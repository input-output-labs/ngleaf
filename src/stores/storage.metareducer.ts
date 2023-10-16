import { Action, ActionReducer } from "@ngrx/store";
import { merge, pick } from 'lodash-es';

function setSavedState(state: any, localStorageKey: string) {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
}
function getSavedState(localStorageKey: string): any {
    return JSON.parse(localStorage.getItem(localStorageKey));
}

// the key for the local storage.
const localStorageKey = '__ciol_state_storage__';

export function storageMetaReducer<S, A extends Action = Action>(reducer: ActionReducer<S, A>) {
    let onInit = true; // after load/refresh…
    return function (state: S, action: A): S {
        // reduce the nextState.
        const nextState = reducer(state, action);
        // init the application state.
        if (onInit) {
            onInit = false;
            const savedState = getSavedState(localStorageKey);
            return merge(nextState, savedState);
        }
        // save the next state to the application storage.
        const stateToSave = nextState;
        setSavedState(stateToSave, localStorageKey);
        return nextState;
    };
}