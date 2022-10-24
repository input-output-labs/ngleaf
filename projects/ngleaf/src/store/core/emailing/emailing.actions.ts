import { createAction, props } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LeafEmailingCategory, LeafBatchCreationTestingReport } from '../../../api/models/emailing/index';

export const resetEmailing = createAction(
  '[Emailing store] Reset emailing store'
);

/* Categories list */
export const setEmailingCategoriesCall = createAction(
  '[Emailing store] Set EmailingCategories call',
  props<{call: Observable<LeafEmailingCategory[]>}>()
);
export const setEmailingCategoriesSuccess = createAction(
  '[Emailing store] Set EmailingCategories success',
  props<{data: LeafEmailingCategory[]}>()
);
export const setEmailingCategoriesFailure = createAction(
  '[Emailing store] Set EmailingCategories failure',
  props<{error: any}>()
);

/* Category action*/
export const setEmailingCategoryActionCall = createAction(
  '[Emailing store] Set EmailingCategoryAction call',
  props<{call: Observable<any>}>()
);
export const setEmailingCategoryActionSuccess = createAction(
  '[Emailing store] Set EmailingCategoryAction success'
);
export const setEmailingCategoryActionFailure = createAction(
  '[Emailing store] Set EmailingCategoryAction failure',
  props<{error: any}>()
);

/* Test email batch */
export const setTestEmailBatchCall = createAction(
  '[Emailing store] Set TestEmailBatch call',
  props<{call: Observable<LeafBatchCreationTestingReport>}>()
);
export const setTestEmailBatchSuccess = createAction(
  '[Emailing store] Set TestEmailBatch success',
  props<{data: LeafBatchCreationTestingReport}>()
);
export const setTestEmailBatchFailure = createAction(
  '[Emailing store] Set TestEmailBatch failure',
  props<{error: any}>()
);

/* Email batch */
export const setEmailBatchCall = createAction(
  '[Emailing store] Set EmailBatch call',
  props<{call: Observable<any>}>()
);
export const setEmailBatchSuccess = createAction(
  '[Emailing store] Set EmailBatch success',
  props<{data: any}>()
);
export const setEmailBatchFailure = createAction(
  '[Emailing store] Set EmailBatch failure',
  props<{error: any}>()
);
