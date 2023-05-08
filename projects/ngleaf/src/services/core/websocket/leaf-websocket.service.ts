import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { RxStomp } from "@stomp/rx-stomp";
import { Subscription, distinctUntilChanged, map } from "rxjs";
import { myRxStompConfig } from "./rx-stomp.config";
import { selectCurrentAccountData } from "../../../store/core/session/session.selectors";
import { fetchNotifications } from "../../../store/core/notifications/notifications.actions";

export interface Message {
  source: string;
  content: string;
}

@Injectable()
export class LeafWebSocketService extends RxStomp {
  private notificationSubscription: Subscription = null;

  constructor(store: Store) {
    super();
    this.configure(myRxStompConfig);
    this.activate();

    store.pipe(
      select(selectCurrentAccountData),
      map(currentAccount => currentAccount?.id),
      distinctUntilChanged(),
    ).subscribe((currentAccountId) => {
      if (this.notificationSubscription) {
        this.notificationSubscription.unsubscribe();
      }
      const watchedDestination = `/notifications/${currentAccountId}`;
      this.notificationSubscription = this.watch(watchedDestination).subscribe((message: any) => {
        if(message.body === 'REFRESH') {
          store.dispatch(fetchNotifications());
        }
      });
    });
  }


}
