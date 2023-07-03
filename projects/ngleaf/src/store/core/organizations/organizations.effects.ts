import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, switchMap, catchError, withLatestFrom } from "rxjs/operators";

import * as OrganizationsActions from "./organizations.actions";

import { OrganizationsApiClientService } from "../../../api/clients";
import { LeafOrganization } from "../../../api/models";
import { Store } from "@ngrx/store";
import { selectCurrentOrganizationId } from "./organizations.selectors";
import { setCurrentAccountSuccess } from "../session";

@Injectable()
export class OrganizationsEffects {
  constructor(
    private actions$: Actions,
    private organizationApiClient: OrganizationsApiClientService,
    private store: Store
  ) {}

  listAllOrganizations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationsActions.listAllOrganizations),
      switchMap(() =>
        this.organizationApiClient.listAllOrganizations().pipe(
          map((organizations) =>
            OrganizationsActions.setAllOrganizationsSuccess({
              data: organizations,
            })
          ),
          catchError((error) =>
            of(OrganizationsActions.setAllOrganizationsFailure({ error }))
          )
        )
      )
    )
  );

  listMyOrganizations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationsActions.listMyOrganizations),
      switchMap(() =>
        this.organizationApiClient.listMyOrganizations().pipe(
          map((organizations) =>
            OrganizationsActions.setMyOrganizationsSuccess({
              data: organizations,
            })
          ),
          catchError((error) =>
            of(OrganizationsActions.setMyOrganizationsFailure({ error }))
          )
        )
      )
    )
  );

  listCurrentOrganizationUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationsActions.listCurrentOrganizationUsers),
      withLatestFrom(this.store.select(selectCurrentOrganizationId)),
      switchMap(([, currentOrganizationId]) => {
        if (currentOrganizationId) {
          return this.organizationApiClient
            .listOrganizationUsersById(currentOrganizationId)
            .pipe(
              map((users) =>
                OrganizationsActions.setCurrentOrganizationUsersSuccess({
                  data: users,
                })
              ),
              catchError((error) =>
                of(
                  OrganizationsActions.setCurrentOrganizationUsersFailure({
                    error,
                  })
                )
              )
            );
        }
        return of(OrganizationsActions.resetCurrentOrganizationUsers());
      })
    )
  );

  createOrganization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationsActions.createOrganization),
      switchMap((payload: { organization: LeafOrganization }) =>
        this.organizationApiClient
          .createOrganization(payload.organization)
          .pipe(
            map(() => OrganizationsActions.createOrganizationSuccess()),
            catchError((error) =>
              of(OrganizationsActions.createOrganizationFailure({ error }))
            )
          )
      )
    )
  );

  createOrganizationSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationsActions.createOrganizationSuccess),
      map(() => OrganizationsActions.listAllOrganizations())
    )
  );

  addUsersToOrganization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationsActions.addUsersToOrganization),
      switchMap((payload: {id: string, accountIds: string[]}) =>
        this.organizationApiClient
          .addUsersToOrganization(payload.id, payload.accountIds)
          .pipe(
            map(() => OrganizationsActions.addUsersToOrganizationSuccess()),
            catchError((error) =>
              of(OrganizationsActions.addUsersToOrganizationFailure({ error }))
            )
          )
      )
    )
  );

  setCurrentAccountSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setCurrentAccountSuccess),
      map(() => OrganizationsActions.listMyOrganizations())
    )
  );

}
