import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as EligibilitiesActions from './eligibilities.actions';
import * as OrganizationActions from '../organizations/organizations.actions';
import { EligibilitiesApiClientService } from '../../../api/index';
import { setSessionTokenSuccess } from '../session';

@Injectable()
export class EligibilitiesEffects {

  fetchEligibilites$ = createEffect(() => this.actions$.pipe(
    ofType(EligibilitiesActions.fetchEligibilites),
    switchMap(() =>
      this.eligibilitesClient.fetchEligibilities().pipe(
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
