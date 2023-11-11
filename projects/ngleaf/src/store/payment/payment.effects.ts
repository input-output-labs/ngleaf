import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { LeafRoomModel } from '../../api/models/messenger.model';
import * as PaymentActions from './payment.actions';
import { PaymentApiClientService } from '../../api/clients/payment-api-client';
import { LeafPaymentPlan } from '../../api';
import { fetchEligibilites } from '../core';

@Injectable()
export class PaymentEffects {

  fetchPlans$ = createEffect(() => this.actions$.pipe(
    ofType(PaymentActions.fetchPlans),
    switchMap(() =>
    this.paymentApiClient.fetchPlans().pipe(
        map(plans => (PaymentActions.fetchPlansSuccess({data: plans}))),
        catchError((error) => of(PaymentActions.fetchPlansFailure({error})))
      ))
    )
  );

  selectPaymentPlan$ = createEffect(() => this.actions$.pipe(
    ofType(PaymentActions.selectPaymentPlan),
    switchMap((payload: {selectedPlan: LeafPaymentPlan}) =>
    this.paymentApiClient.selectPaymentPlan(payload.selectedPlan).pipe(
        map((plan) => (PaymentActions.selectPaymentPlanSuccess({data: plan}))),
        catchError((error) => of(PaymentActions.selectPaymentPlanFailure({error})))
      ))
    )
  );

  updateEligibilities$ = createEffect(() => this.actions$.pipe(
    ofType(PaymentActions.selectPaymentPlanSuccess),
    map(() => fetchEligibilites())
    )
  );

  constructor(
    private actions$: Actions,
    private paymentApiClient: PaymentApiClientService,
  ) {}
}
