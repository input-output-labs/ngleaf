import { Component, OnInit } from "@angular/core";
import { LeafNotificationModel } from "../../../api/models/notifications.model";
import { Observable, combineLatest, map, take } from "rxjs";
import { Store } from "@ngrx/store";
import {
  fetchNotifications,
  selectNotifications,
  selectNotificationsCount,
  selectUnseenNotificationsCount,
  setNotificationsAsSeen,
} from "../../../store";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";

@Component({
  selector: "leaf-notifications-widget",
  templateUrl: "./notifications-widget.component.html",
  styleUrls: ["./notifications-widget.component.scss"],
})
export class NotificationsWidgetComponent implements OnInit {
  public notifications$: Observable<LeafNotificationModel[]>;
  public unseenNotificationsCount$: Observable<number>;
  public notificationIcon$: Observable<string>;

  constructor(
    private store: Store,
    private translateService: TranslateService,
    private router: Router
  ) {
    this.notifications$ = store.select(selectNotifications);
    this.unseenNotificationsCount$ = store.select(
      selectUnseenNotificationsCount
    );

    this.notificationIcon$ = combineLatest([
      store.select(selectNotificationsCount),
      store.select(selectUnseenNotificationsCount),
    ]).pipe(
      map(([notificationsCount, unseenNotificationsCount]) => {
        if (unseenNotificationsCount > 0) {
          return "notifications_active";
        } else if (notificationsCount > 0) {
          return "notifications";
        } else {
          return "notifications_none";
        }
      })
    );
  }
  ngOnInit(): void {
    this.store.dispatch(fetchNotifications());
  }

  public onMenuOpened() {
    this.notifications$
      .pipe(take(1))
      .subscribe((notifications: LeafNotificationModel[]) => {
        const unseenNotifications = notifications.filter(
          (notification) => notification.channelSendingStatus.UI === "CREATED"
        );

        if (unseenNotifications.length) {
          this.store.dispatch(
            setNotificationsAsSeen({
              notifications: unseenNotifications,
            })
          );
        }
      });
  }

  public onNotificationClicked(notification: LeafNotificationModel) {
    const key = `leaf.notification-item.${notification.code}.link`;
    this.translateService.get([key]).subscribe((data) => {
      const redirectionLink = data[key];
      if (redirectionLink !== key) {
        this.router.navigate([redirectionLink]);
      }
    });
  }
}
