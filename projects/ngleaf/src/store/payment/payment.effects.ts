import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { LeafRoomModel } from '../../api/models/messenger.model';
import * as PaymentActions from './payment.actions';
import { PaymentApiClientService } from '../../api/clients/payment-api-client';
import { ServicesApiClientService } from '../../api/clients/services-api-client';
import { LeafPaymentPlan, LeafService } from '../../api';
import { fetchEligibilites } from '../core';

@Injectable()
export class PaymentEffects {

  fetchSelectedPaymentPlanInfo$ = createEffect(() => this.actions$.pipe(
    ofType(PaymentActions.fetchSelectedPaymentPlanInfo),
    switchMap(() =>
    this.paymentApiClient.fetchSelectedPaymentPlanInfo().pipe(
        map(paymentPlanInfo => (PaymentActions.fetchSelectedPaymentPlanInfoSuccess({data: paymentPlanInfo}))),
        catchError((error) => of(PaymentActions.fetchSelectedPaymentPlanInfoFailure({error})))
      ))
    )
  );

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

  fetchInvoices$ = createEffect(() => this.actions$.pipe(
    ofType(PaymentActions.fetchInvoices),
    switchMap((payload: {invoicesType: string}) =>
    this.paymentApiClient.fetchInvoices(payload.invoicesType).pipe(
        map(invoices => (PaymentActions.fetchInvoicesSuccess({data: invoices}))),
        catchError((error) => of(PaymentActions.fetchInvoicesFailure({error})))
      ))
    )
  );

  /* Services Effects */
  createService$ = createEffect(() => this.actions$.pipe(
    ofType(PaymentActions.createService),
    map((payload: {service: LeafService}) => PaymentActions.setCreateServiceCall({
      call: this.servicesApiClient.createService(payload.service)
    })),
  ));

  createServiceCall$ = createEffect(() => this.actions$.pipe(
    ofType(PaymentActions.setCreateServiceCall),
    switchMap((payload: {call: Observable<LeafService>}) =>
      payload.call.pipe(
        map(service => PaymentActions.setCreateServiceSuccess({data: service})),
        catchError((error) => of(PaymentActions.setCreateServiceFailure({error})))
      )
    )
  ));

  updateService$ = createEffect(() => this.actions$.pipe(
    ofType(PaymentActions.updateService),
    map((payload: {id: string, service: LeafService}) => PaymentActions.setUpdateServiceCall({
      call: this.servicesApiClient.updateService(payload.id, payload.service)
    })),
  ));

  updateServiceCall$ = createEffect(() => this.actions$.pipe(
    ofType(PaymentActions.setUpdateServiceCall),
    switchMap((payload: {call: Observable<LeafService>}) =>
      payload.call.pipe(
        map(service => PaymentActions.setUpdateServiceSuccess({data: service})),
        catchError((error) => of(PaymentActions.setUpdateServiceFailure({error})))
      )
    )
  ));

  deleteService$ = createEffect(() => this.actions$.pipe(
    ofType(PaymentActions.deleteService),
    switchMap((payload: {id: string}) =>
      this.servicesApiClient.deleteService(payload.id).pipe(
        map(() => PaymentActions.setDeleteServiceSuccess({data: {id: payload.id} as LeafService})),
        catchError((error) => of(PaymentActions.setDeleteServiceFailure({error})))
      )
    )
  ));

  listOrganizationServices$ = createEffect(() => this.actions$.pipe(
    ofType(PaymentActions.listOrganizationServices),
    map((payload: {organizationId?: string}) => PaymentActions.setListOrganizationServicesCall({
      call: (payload.organizationId
        ? this.servicesApiClient.getServicesByOrganization(payload.organizationId)
        : this.servicesApiClient.getMyOrganizationServices()
      )
    })),
  ));

  listOrganizationServicesCall$ = createEffect(() => this.actions$.pipe(
    ofType(PaymentActions.setListOrganizationServicesCall),
    switchMap((payload: {call: Observable<LeafService[]>}) =>
      payload.call.pipe(
        map(services => PaymentActions.setListOrganizationServicesSuccess({data: services})),
        catchError((error) => of(PaymentActions.setListOrganizationServicesFailure({error})))
      )
    )
  ));

  fetchAvailableServices$ = createEffect(() => this.actions$.pipe(
    ofType(PaymentActions.fetchAvailableServices),
    map(() => PaymentActions.setFetchAvailableServicesCall({
      call: this.servicesApiClient.fetchAvailableServices()
    })),
  ));

  fetchAvailableServicesCall$ = createEffect(() => this.actions$.pipe(
    ofType(PaymentActions.setFetchAvailableServicesCall),
    switchMap((payload: {call: Observable<LeafService[]>}) =>
      payload.call.pipe(
        map(services => PaymentActions.setFetchAvailableServicesSuccess({data: services})),
        catchError((error) => of(PaymentActions.setFetchAvailableServicesFailure({error})))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private paymentApiClient: PaymentApiClientService,
    private servicesApiClient: ServicesApiClientService,
  ) {}
}
