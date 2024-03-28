import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as EligibilitiesActions from './eligibilities.actions';
import * as OrganizationActions from '../organizations/organizations.actions';
import { EligibilitiesApiClientService, LeafEligibilities } from '../../../api/index';
import { setSessionTokenSuccess } from '../session';

@Injectable()
export class EligibilitiesEffects {

  fetchEligibilites$ = createEffect(() => this.actions$.pipe(
    ofType(EligibilitiesActions.fetchEligibilites),
    map(
      () => EligibilitiesActions.fetchEligibilitesCall({call: this.eligibilitesClient.fetchEligibilities()})
    )
  ));

  fetchEligibilitesCall$ = createEffect(() => this.actions$.pipe(
    ofType(EligibilitiesActions.fetchEligibilitesCall),
    switchMap((payload: {call: Observable<LeafEligibilities>}) =>
      payload.call.pipe(
        map((eligibilities) => EligibilitiesActions.fetchEligibilitesSuccess({data: eligibilities})),
        catchError((error) => of(EligibilitiesActions.fetchEligibilitesFailure({error})))
      ))
    )
  );

  fetchEligibilitesForMisceleaousPurposes$ = createEffect(() => this.actions$.pipe(
    ofType(OrganizationActions.setCurrentOrganizationId, OrganizationActions.updateRoleSuccess, OrganizationActions.setUserRoleSuccess, setSessionTokenSuccess),
    switchMap(() => of(EligibilitiesActions.fetchEligibilites()))
  ));

  constructor(
    private actions$: Actions,
    private eligibilitesClient: EligibilitiesApiClientService
  ) {}
}
