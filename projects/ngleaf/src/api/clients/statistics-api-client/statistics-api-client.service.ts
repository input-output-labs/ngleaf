import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LeafAuthHttpClient } from '../auth-http-client/leaf-auth-http-client.service';
import { LeafApiClientConfig, LeafApiClientConfigServiceToken } from '../api-client-config.module';
import { LeafStatistic } from '../../models/leaf-statistic.model';

@Injectable()
export class StatisticsApiClientService {
  public constructor(
    @Inject(LeafApiClientConfigServiceToken) public config: LeafApiClientConfig,
    public authHttp: LeafAuthHttpClient
    ) {}

    public fetchStatistics(): Observable<LeafStatistic[]> {
      return this.authHttp.get<LeafStatistic[]>(this.config.serverUrl + '/statistics');
    }
}
