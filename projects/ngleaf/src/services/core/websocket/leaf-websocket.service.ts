import { Inject, Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { RxStomp } from "@stomp/rx-stomp";
import { Subscription, distinctUntilChanged, map } from "rxjs";
import { myRxStompConfig } from "./rx-stomp.config";
import { selectCurrentAccountData } from "../../../store/core/session/session.selectors";
import { fetchNotifications } from "../../../store/core/notifications/notifications.actions";
import { LeafConfig } from "../../../models";
import { LeafConfigServiceToken } from "../../../services";

export interface Message {
  source: string;
  content: string;
}

@Injectable()
export class LeafWebSocketService extends RxStomp {
  private notificationSubscription: Subscription = null;

  constructor(
    @Inject(LeafConfigServiceToken) public config: LeafConfig,
    private store: Store) {
    super();
  }

  public init() {
    this.configure({
      ...myRxStompConfig,
      brokerURL: this.config.serverWSBrokerUrl
    });
    this.activate();

    this.store.pipe(
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
          this.store.dispatch(fetchNotifications());
        }
      });
    });
  }
}
