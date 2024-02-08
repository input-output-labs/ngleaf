import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, switchMap, catchError, withLatestFrom } from "rxjs/operators";

import * as OrganizationsActions from "./organizations.actions";

import { OrganizationsApiClientService } from "../../../api/clients";
import { LeafAccountProfile, LeafOrganization, OrganizationRole } from "../../../api/models";
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
      map(([, currentOrganizationId]) => {
        if (currentOrganizationId) {
          return OrganizationsActions.listOrganizationUsers({
            organizationId: currentOrganizationId,
          });
        }
        return OrganizationsActions.resetOrganizationUsers();
      })
    )
  );

  listOrganizationUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationsActions.listOrganizationUsers),
      switchMap((payload: { organizationId: string }) => {
        return this.organizationApiClient
          .listOrganizationUsersById(payload.organizationId)
          .pipe(
            map((users) =>
              OrganizationsActions.setOrganizationUsersSuccess({
                organizationId: payload.organizationId,
                data: users,
              })
            ),
            catchError((error) =>
              of(
                OrganizationsActions.setOrganizationUsersFailure({
                  error,
                })
              )
            )
          );
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

  updateOrganizationProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationsActions.updateOrganizationProfile),
      switchMap((payload: {organizationId: string, profile: LeafAccountProfile}) =>
        this.organizationApiClient
          .updateOrganizationProfile(payload.organizationId, payload.profile)
          .pipe(
            map((data) => OrganizationsActions.updateOrganizationProfileSuccess({data})),
            catchError((error) =>
              of(OrganizationsActions.updateOrganizationProfileFailure({ error }))
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
      switchMap((payload: { id: string; accountIds: string[] }) =>
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

  setUserRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationsActions.setUserRole),
      switchMap((payload: { accountId: string; role: string }) =>
        this.organizationApiClient
          .setUserRole(payload.accountId, payload.role)
          .pipe(
            map((organization: LeafOrganization) => OrganizationsActions.setUserRoleSuccess({data: organization})),
            catchError((error) =>
              of(OrganizationsActions.setUserRoleFailure({ error }))
            )
          )
      )
    )
  );

  removeUserFromOrganization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationsActions.removeUserFromOrganization),
      switchMap((payload: { accountId: string }) =>
        this.organizationApiClient
          .removeUserFromOrganization(payload.accountId)
          .pipe(
            map((organization: LeafOrganization) => OrganizationsActions.removeUserFromOrganizationSuccess({data: organization})),
            catchError((error) =>
              of(OrganizationsActions.removeUserFromOrganizationFailure({ error }))
            )
          )
      )
    )
  );

  listMyOrganizationsTriggers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setCurrentAccountSuccess),
      map(() => OrganizationsActions.listMyOrganizations())
    )
  );

  inviteUserToOrganization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationsActions.inviteUserToOrganization),
      switchMap((payload: { email: string }) =>
        this.organizationApiClient
          .inviteUserToOrganization(payload.email)
          .pipe(
            map((data) => OrganizationsActions.inviteUserToOrganizationSuccess({data})),
            catchError((error) =>
              of(OrganizationsActions.inviteUserToOrganizationFailure({ error }))
            )
          )
      )
    )
  );

  getInvitationData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationsActions.getInvitationData),
      switchMap((payload: { id: string; email: string }) =>
        this.organizationApiClient
          .getInvitationData(payload.id, payload.email)
          .pipe(
            map((data) => OrganizationsActions.getInvitationDataSuccess({data})),
            catchError((error) =>
              of(OrganizationsActions.getInvitationDataFailure({ error }))
            )
          )
      )
    )
  );

  cancelInvitation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationsActions.cancelInvitation),
      switchMap((payload: { email: string }) =>
        this.organizationApiClient
          .cancelInvitation(payload.email)
          .pipe(
            map(() => OrganizationsActions.listMyOrganizations())
          )
      )
    )
  );

  createRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationsActions.createRole),
      switchMap((payload: { name: string }) =>
        this.organizationApiClient
          .createRole(payload.name)
          .pipe(
            map((organization: LeafOrganization) => OrganizationsActions.createRoleSuccess({data: organization})),
            catchError((error) =>
              of(OrganizationsActions.createRoleFailure({ error }))
            )
          )
      )
    )
  );

  updateRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationsActions.updateRole),
      switchMap((payload: { roleName: string; role: OrganizationRole }) =>
        this.organizationApiClient
          .updateRole(payload.roleName, payload.role)
          .pipe(
            map((organization: LeafOrganization) => OrganizationsActions.updateRoleSuccess({data: organization})),
            catchError((error) =>
              of(OrganizationsActions.updateRoleFailure({ error }))
            )
          )
      )
    )
  );

  deleteRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationsActions.deleteRole),
      switchMap((payload: { role: OrganizationRole }) =>
        this.organizationApiClient
          .deleteRole(payload.role)
          .pipe(
            map((organization: LeafOrganization) => OrganizationsActions.deleteRoleSuccess({data: organization})),
            catchError((error) =>
              of(OrganizationsActions.deleteRoleFailure({ error }))
            )
          )
      )
    )
  );

  acceptInvitation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationsActions.acceptInvitation),
      switchMap((payload: { organizationId: string, email: string }) =>
        this.organizationApiClient
          .acceptInvitation(payload.organizationId, payload.email)
          .pipe(
            map(() => OrganizationsActions.invitationAcceptationOrDeclineSuccess()),
            catchError((error) =>
              of(OrganizationsActions.invitationAcceptationOrDeclineFailure({ error }))
            )
          )
      )
    )
  );

  declineInvitation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationsActions.declineInvitation),
      switchMap((payload: { organizationId: string, email: string }) =>
        this.organizationApiClient
          .declineInvitation(payload.organizationId, payload.email)
          .pipe(
            map(() => OrganizationsActions.invitationAcceptationOrDeclineSuccess()),
            catchError((error) =>
              of(OrganizationsActions.invitationAcceptationOrDeclineFailure({ error }))
            )
          )
      )
    )
  );
}
