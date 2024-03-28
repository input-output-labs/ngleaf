import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";
import {
  fetchNotifications,
  fetchNotificationsCall,
  setNotificationsAsSeen,
  upsertNotifications,
} from "./notifications.actions";
import { NotificationApiClientService } from "../../../api/clients/notification-api-client";
import { LeafNotificationModel } from "../../../api/models/notifications.model";
import { Observable } from "rxjs";

@Injectable()
export class NotificationsEffects {
  fetchNotifications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchNotifications),
      map(
        () => fetchNotificationsCall({call: this.notificationApiClientService.fetchMyNotifications()})
      )
    )
  );

  fetchNotificationsCall$ = createEffect(() => this.actions$.pipe(
    ofType(fetchNotificationsCall),
    switchMap((payload: {call: Observable<LeafNotificationModel[]>}) =>
      payload.call.pipe(
        map(notifications => upsertNotifications({notifications})),
      ))
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
