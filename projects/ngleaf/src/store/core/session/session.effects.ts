import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { JWTModel, LeafAccountModel, LeafAccountProfile } from '../../../api/models/index';
import { AccountApiClient } from '../../../api/clients/index';

import { sendEmailVerificationCode, setCurrentAccountCall, setCurrentAccountFailure, setCurrentAccountSuccess, setMailingsUnsubscriptionCall, setMailingsUnsubscriptionFailure, setMailingsUnsubscriptionSuccess, setResetPasswordCall, setResetPasswordFailure, setResetPasswordSuccess, setSendEmailVerificationCodeFailure, setSendEmailVerificationCodeSuccess, setSendResetPasswordKeyCall, setSendResetPasswordKeyFailure, setSendResetPasswordKeySuccess, setSessionToken, setSessionTokenCall, setSessionTokenFailure, setSessionTokenSuccess, setUpdatePasswordCall, setUpdatePasswordFailure, setUpdatePasswordSuccess, updateProfile, updateProfileFailure, updateProfileSuccess, validateEmailVerificationCode, setValidateEmailVerificationCodeFailure, setValidateEmailVerificationCodeSuccess } from './session.actions';

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

  updateProfile$ = createEffect(() => this.actions$.pipe(
    ofType(updateProfile),
    switchMap((payload: {updates: LeafAccountProfile}) =>
    this.accountApiClient.updateProfile(payload.updates).pipe(
        map((account: LeafAccountModel) => (updateProfileSuccess({data: account}))),
        catchError((error) => of(updateProfileFailure({error})))
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

  sendEmailVerificationCode$ = createEffect(() => this.actions$.pipe(
    ofType(sendEmailVerificationCode),
    switchMap(() => this.accountApiClient.sendEmailVerificationCode().pipe(
      map((data) => (setSendEmailVerificationCodeSuccess({data}))),
        catchError((error) => of(setSendEmailVerificationCodeFailure({error})))
      ))
    )
  );

  validateEmailVerificationCode$ = createEffect(() => this.actions$.pipe(
    ofType(validateEmailVerificationCode),
    switchMap((payload: {code: string}) => this.accountApiClient.validateEmailVerificationCode(payload.code).pipe(
      map((data) => (setValidateEmailVerificationCodeSuccess({data}))),
        catchError((error) => of(setValidateEmailVerificationCodeFailure({error})))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private accountApiClient: AccountApiClient,
  ) {}
}
