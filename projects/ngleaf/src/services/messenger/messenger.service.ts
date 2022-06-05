import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { LeafAuthHttpClient, MessengerApiClient } from '../../api/clients/index';
import { LeafRoomModel } from '../../api/models/messenger.model';

import { LeafConfig } from '../../models/index';
import { LeafConfigServiceToken } from '../leaf-config.module';


@Injectable()
export class LeafMessengerService {

  constructor(
    @Inject(LeafConfigServiceToken) public config: LeafConfig,
    private messengerApiClient: MessengerApiClient,
    private store: Store,
    public authHttp: LeafAuthHttpClient,
  ) {}

  public createRoom(newRoom: LeafRoomModel) {
    const call = this.messengerApiClient.createRoom(newRoom);
    call.subscribe(console.log);
  }
}
