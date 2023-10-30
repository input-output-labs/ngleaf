import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LeafAuthHttpClient } from '../auth-http-client/leaf-auth-http-client.service';
import { LeafApiClientConfig, LeafApiClientConfigServiceToken } from '../api-client-config.module';
import { LeafEligibilities } from '../../models/leaf-eligilibities';

@Injectable()
export class EligibilitiesApiClientService {
  public constructor(
    @Inject(LeafApiClientConfigServiceToken) public config: LeafApiClientConfig,
    public authHttp: LeafAuthHttpClient
    ) {}

    public fetchEligibilities(): Observable<LeafEligibilities> {
      return this.authHttp.get<LeafEligibilities>(this.config.serverUrl + '/eligibilities');
    }
}
