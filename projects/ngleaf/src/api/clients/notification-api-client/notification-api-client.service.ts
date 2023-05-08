import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LeafAuthHttpClient } from "../auth-http-client/leaf-auth-http-client.service";
import {
  LeafApiClientConfig,
  LeafApiClientConfigServiceToken,
} from "../api-client-config.module";
import { LeafNotificationModel } from "../../models/notifications.model";

@Injectable()
export class NotificationApiClientService {
  public constructor(
    @Inject(LeafApiClientConfigServiceToken) public config: LeafApiClientConfig,
    public authHttp: LeafAuthHttpClient
  ) {}

  public fetchMyNotifications(): Observable<LeafNotificationModel[]> {
    return this.authHttp.get<LeafNotificationModel[]>(
      this.config.serverUrl + "/notifications/mine"
    );
  }

  public setNotificationsAsSeen(notifications: LeafNotificationModel[]): Observable<LeafNotificationModel[]> {
    return this.authHttp.post<LeafNotificationModel[]>(
      this.config.serverUrl + "/notifications/seen",
      notifications.map(notification => notification.id)
    );
  }
}
