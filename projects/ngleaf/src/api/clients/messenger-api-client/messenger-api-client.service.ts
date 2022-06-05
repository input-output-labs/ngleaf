import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LeafAuthHttpClient } from '../auth-http-client/leaf-auth-http-client.service';
import { LeafApiClientConfig, LeafApiClientConfigServiceToken } from '../api-client-config.module';
import { LeafRoomModel } from '../../models/messenger.model';

@Injectable()
export class MessengerApiClient {
  public constructor(
    @Inject(LeafApiClientConfigServiceToken) public config: LeafApiClientConfig,
    public authHttp: LeafAuthHttpClient
    ) {}

    public createRoom(newRoom: LeafRoomModel): Observable<LeafRoomModel> {
      return this.authHttp.post<LeafRoomModel>(this.config.serverUrl + '/rooms', newRoom);
    }
}
