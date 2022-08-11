import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { setPushEventsCall, setPushEventsFailure, setPushEventsSuccess } from './analytics.actions';

@Injectable()
export class AnalyticsEffects {

  pushEventsCall$ = createEffect(() => this.actions$.pipe(
    ofType(setPushEventsCall),
    switchMap((payload: {call: Observable<void>}) =>
    payload.call.pipe(
        map(_ => (setPushEventsSuccess())),
        catchError((error) => of(setPushEventsFailure({error})))
      ))
    )
  );

  constructor(
    private actions$: Actions
  ) {}
}
