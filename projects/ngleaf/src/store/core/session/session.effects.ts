import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { JWTModel, LeafAccountModel } from '../../../api/models/index';
import { AccountApiClient } from '../../../api/clients/index';
import { setCurrentAccountCall, setCurrentAccountFailure, setCurrentAccountSuccess, setMailingsUnsubscriptionCall, setMailingsUnsubscriptionFailure, setMailingsUnsubscriptionSuccess, setResetPasswordCall, setResetPasswordFailure, setResetPasswordSuccess, setSendResetPasswordKeyCall, setSendResetPasswordKeyFailure, setSendResetPasswordKeySuccess, setSessionTokenCall, setSessionTokenFailure, setSessionTokenSuccess, setUpdatePasswordCall, setUpdatePasswordFailure, setUpdatePasswordSuccess } from './session.actions';

@Injectable()
export class SessionEffects {

  setCurrentAccountCall$ = createEffect(() => this.actions$.pipe(
    ofType(setCurrentAccountCall),
    switchMap((payload: {call: Observable<LeafAccountModel>}) =>
    payload.call.pipe(
        map(currentAccount => (setCurrentAccountSuccess({data: currentAccount}))),
        catchError((error) => of(setCurrentAccountFailure({error})))
      ))
    )
  );

  setSessionTokenCall$ = createEffect(() => this.actions$.pipe(
    ofType(setSessionTokenCall),
    switchMap((payload: {call: Observable<JWTModel>}) =>
    payload.call.pipe(
        map(sessionToken => (setSessionTokenSuccess({data: sessionToken}))),
        catchError((error) => of(setSessionTokenFailure({error})))
      ))
    )
  );

  setSendResetPasswordKeyCall$ = createEffect(() => this.actions$.pipe(
    ofType(setSendResetPasswordKeyCall),
    switchMap((payload: {call: Observable<void>}) =>
    payload.call.pipe(
        map(() => (setSendResetPasswordKeySuccess())),
        catchError((error) => of(setSendResetPasswordKeyFailure({error})))
      ))
    )
  );

  setResetPasswordCall$ = createEffect(() => this.actions$.pipe(
    ofType(setResetPasswordCall),
    switchMap((payload: {call: Observable<void>}) =>
    payload.call.pipe(
        map(() => (setResetPasswordSuccess())),
        catchError((error) => of(setResetPasswordFailure({error})))
      ))
    )
  );

  setUpdatePasswordCall$ = createEffect(() => this.actions$.pipe(
    ofType(setUpdatePasswordCall),
    switchMap((payload: {call: Observable<LeafAccountModel>}) =>
    payload.call.pipe(
        map((accountData) => (setUpdatePasswordSuccess({data: accountData}))),
        catchError((error) => of(setUpdatePasswordFailure({error})))
      ))
    )
  );

  setMailingsUnsubscriptionCall$ = createEffect(() => this.actions$.pipe(
    ofType(setMailingsUnsubscriptionCall),
    switchMap((payload: {call: Observable<void>}) =>
    payload.call.pipe(
        map(() => (setMailingsUnsubscriptionSuccess())),
        catchError((error) => of(setMailingsUnsubscriptionFailure({error})))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private accountApiClient: AccountApiClient
  ) {}
}
