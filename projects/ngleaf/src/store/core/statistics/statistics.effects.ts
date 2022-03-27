import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { LeafStatistic } from '../../../api/models/index';
import { setStatisticsCall, setStatisticsFailure, setStatisticsSuccess } from './statistics.actions';

@Injectable()
export class StatisticsEffects {

  setStatisticsCall$ = createEffect(() => this.actions$.pipe(
    ofType(setStatisticsCall),
    switchMap((payload: {call: Observable<LeafStatistic[]>}) =>
    payload.call.pipe(
        map(currentAccount => (setStatisticsSuccess({data: currentAccount}))),
        catchError((error) => of(setStatisticsFailure({error})))
      ))
    )
  );

  constructor(
    private actions$: Actions
  ) {}
}
