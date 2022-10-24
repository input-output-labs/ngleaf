import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";

import {
  LeafBatchCreationTestingReport,
  LeafEmailingCategory,
} from "../../../api/models/emailing/index";
import * as actions from "./emailing.actions";

@Injectable()
export class EmailingEffects {
  setEmailingCategoriesCall$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.setEmailingCategoriesCall),
      switchMap((payload: { call: Observable<LeafEmailingCategory[]> }) =>
        payload.call.pipe(
          map((categories) =>
            actions.setEmailingCategoriesSuccess({ data: categories })
          ),
          catchError((error) =>
            of(actions.setEmailingCategoriesFailure({ error }))
          )
        )
      )
    )
  );

  setEmailingCategoryActionCall$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.setEmailingCategoryActionCall),
      switchMap((payload: { call: Observable<void> }) =>
        payload.call.pipe(
          map(() => actions.setEmailingCategoryActionSuccess()),
          catchError((error) =>
            of(actions.setEmailingCategoryActionFailure({ error }))
          )
        )
      )
    )
  );

  setTestEmailBatchCall$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.setTestEmailBatchCall),
      switchMap(
        (payload: { call: Observable<LeafBatchCreationTestingReport> }) =>
          payload.call.pipe(
            map((data) => actions.setTestEmailBatchSuccess({ data })),
            catchError((error) =>
              of(actions.setTestEmailBatchFailure({ error }))
            )
          )
      )
    )
  );

  setEmailBatchCall$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.setEmailBatchCall),
      switchMap((payload: { call: Observable<any> }) =>
        payload.call.pipe(
          map((data) => actions.setEmailBatchSuccess({ data })),
          catchError((error) => of(actions.setEmailBatchFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions) {}
}
