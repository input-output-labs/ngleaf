import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { LeafNotificationModel } from "../../../api/models/notifications.model";
import { Observable, combineLatest, map, take } from "rxjs";
import { Store, select } from "@ngrx/store";
import {
  fetchNotifications,
  selectNotifications,
  selectNotificationsCount,
  selectUnseenNotificationsCount,
  setNotificationsAsSeen,
} from "../../../store";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { MatMenuTrigger } from "@angular/material/menu";

const NOTIFICATIONS_SORTING_MAP = {
  CREATED: 0,
  UI_SEEN: 1,
};

@Component({
  selector: "leaf-notifications-widget",
  templateUrl: "./notifications-widget.component.html",
  styleUrls: ["./notifications-widget.component.scss"],
})
export class NotificationsWidgetComponent implements OnInit {
  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;

  @Input()
  public menuXPosition: string = "before";
  @Input()
  public menuYPosition: string = "below";

  public notifications$: Observable<LeafNotificationModel[]>;
  public unseenNotificationsCount$: Observable<number>;
  public notificationIcon$: Observable<string>;

  constructor(
    private store: Store,
    private translateService: TranslateService,
    private router: Router
  ) {
    this.notifications$ = store.pipe(
      select(selectNotifications),
      map((notifications: LeafNotificationModel[]) =>
        [...notifications].sort(
          (n1, n2) =>
            new Date(n2.creationDate).getTime() -
            new Date(n1.creationDate).getTime()
        ).sort(
          (n1, n2) =>
            NOTIFICATIONS_SORTING_MAP[n1.channelSendingStatus.UI] -
            NOTIFICATIONS_SORTING_MAP[n2.channelSendingStatus.UI]
        )
      )
    );
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

  public markAllAsSeen() {
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

  public preventClose(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  public onNotificationClicked(notification: LeafNotificationModel) {
    const key = `leaf.notification-item.${notification.code}.link`;
    this.translateService
      .get([key], { payload: notification.payload })
      .subscribe((data) => {
        const redirectionLink = data[key];
        if (redirectionLink !== key) {
          this.router.navigateByUrl(redirectionLink);

          if (notification.channelSendingStatus.UI === "CREATED") {
            this.store.dispatch(
              setNotificationsAsSeen({ notifications: [notification] })
            );
          }

          this.menuTrigger.closeMenu();
        }
      });
  }
}
