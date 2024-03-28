import { createReducer, on } from '@ngrx/store';
import { asyncTypeFailure, asyncTypeSuccess, createAsyncTypeFromCall, createEmptyAsyncType } from '../../common/index';
import * as actions from './emailing.actions';
import { EmailingState } from './emailing.state';

const initialState: EmailingState = {
  categories: createEmptyAsyncType(),
  categoryAction: createEmptyAsyncType(),
  testEmailBatch: createEmptyAsyncType(),
  emailBatch: createEmptyAsyncType()
};

export function emailingReducer(reducerState, action): EmailingState {
  return createReducer(
    initialState,
    /** Current Account */
    on(actions.resetEmailing, (state: EmailingState) => ({...state, statistics: createEmptyAsyncType()})),
    /** Categories */
    on(actions.setEmailingCategoriesCall, (state: EmailingState, {call}) => ({...state, categories: createAsyncTypeFromCall()})),
    on(actions.setEmailingCategoriesSuccess, (state: EmailingState, {data}) => ({...state, categories: asyncTypeSuccess(state.categories, data)})),
    on(actions.setEmailingCategoriesFailure, (state: EmailingState, {error}) => ({...state, categories: asyncTypeFailure(state.categories, error)})),
    /** Category actions */
    on(actions.setEmailingCategoryActionCall, (state: EmailingState, {call}) => ({...state, categoryAction: createAsyncTypeFromCall()})),
    on(actions.setEmailingCategoryActionSuccess, (state: EmailingState) => ({...state, categoryAction: asyncTypeSuccess(state.categoryAction)})),
    on(actions.setEmailingCategoryActionFailure, (state: EmailingState, {error}) => ({...state, categoryAction: asyncTypeFailure(state.categoryAction, error)})),
    /** Test email batch */
    on(actions.setTestEmailBatchCall, (state: EmailingState, {call}) => ({...state, testEmailBatch: createAsyncTypeFromCall()})),
    on(actions.setTestEmailBatchSuccess, (state: EmailingState,{data}) => ({...state, testEmailBatch: asyncTypeSuccess(state.testEmailBatch, data)})),
    on(actions.setTestEmailBatchFailure, (state: EmailingState, {error}) => ({...state, testEmailBatch: asyncTypeFailure(state.testEmailBatch, error)})),
    /** Email batch */
    on(actions.setEmailBatchCall, (state: EmailingState, {call}) => ({...state, emailBatch: createAsyncTypeFromCall()})),
    on(actions.setEmailBatchSuccess, (state: EmailingState,{data}) => ({...state, emailBatch: asyncTypeSuccess(state.emailBatch, data)})),
    on(actions.setEmailBatchFailure, (state: EmailingState, {error}) => ({...state, emailBatch: asyncTypeFailure(state.emailBatch, error)})),
  )(reducerState, action);
}
