import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { LeafRoomModel } from '../../api/models/messenger.model';
import { setRoomCreationCall, setRoomCreationFailure, setRoomCreationSuccess } from './messenger.actions';

@Injectable()
export class MessengerEffects {

  setRoomCreationCall$ = createEffect(() => this.actions$.pipe(
    ofType(setRoomCreationCall),
    switchMap((payload: {call: Observable<LeafRoomModel>}) =>
    payload.call.pipe(
        map(createdRoom => (setRoomCreationSuccess({data: createdRoom}))),
        catchError((error) => of(setRoomCreationFailure({error})))
      ))
    )
  );

  constructor(
    private actions$: Actions
  ) {}
}
