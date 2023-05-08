import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";
import {
  fetchNotifications,
  setNotificationsAsSeen,
  upsertNotifications,
} from "./notifications.actions";
import { NotificationApiClientService } from "../../../api/clients/notification-api-client";
import { LeafNotificationModel } from "../../../api/models/notifications.model";

@Injectable()
export class NotificationsEffects {
  fetchNotifications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchNotifications),
      switchMap(() =>
        this.notificationApiClientService
          .fetchMyNotifications()
          .pipe(map((notifications: LeafNotificationModel[]) => upsertNotifications({ notifications })))
      )
    )
  );

  setNotificationsAsSeen$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setNotificationsAsSeen),
      switchMap((payload: {notifications: LeafNotificationModel[]}) =>
        this.notificationApiClientService
          .setNotificationsAsSeen(payload.notifications)
          .pipe(map((notifications: LeafNotificationModel[]) => upsertNotifications({ notifications })))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private notificationApiClientService: NotificationApiClientService
  ) {}
}
