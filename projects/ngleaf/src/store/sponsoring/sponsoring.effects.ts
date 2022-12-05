import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { LeafAccountModel, SponsoringProfileModel } from '../../api/index';
import { setCurrentAccountSuccess } from '../core';

import { setSetSponsorCall, setSetSponsorFailure, setSetSponsorSuccess, setSponsoringProfilesCall, setSponsoringProfilesFailure, setSponsoringProfilesSuccess } from './sponsoring.actions';

@Injectable()
export class SponsoringEffects {

  setSetSponsorCall$ = createEffect(() => this.actions$.pipe(
    ofType(setSetSponsorCall),
    switchMap((payload: {call: Observable<LeafAccountModel>}) =>
    payload.call.pipe(
        map(updatedAccount => (setSetSponsorSuccess({data: updatedAccount}))),
        catchError((error) => of(setSetSponsorFailure({error})))
      )
    )
  ));

  setSetSponsorSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(setSetSponsorSuccess),
    map((payload: {data: LeafAccountModel}) => setCurrentAccountSuccess({data: payload.data}))
    )
   );

  setSponsoringProfilesCall$ = createEffect(() => this.actions$.pipe(
    ofType(setSponsoringProfilesCall),
    switchMap((payload: {call: Observable<SponsoringProfileModel>}) =>
    payload.call.pipe(
        map(sponsoringProfiles => (setSponsoringProfilesSuccess({data: sponsoringProfiles}))),
        catchError((error) => of(setSponsoringProfilesFailure({error})))
      )
    )
  ));

  constructor(
    private actions$: Actions
  ) {}
}
