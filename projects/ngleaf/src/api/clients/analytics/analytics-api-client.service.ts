import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LeafApiClientConfig, LeafApiClientConfigServiceToken } from '../api-client-config.module';
import { AnalyticEvent } from './analytic-event.model';

@Injectable()
export class LeafAnalyticsApiClient {

  public constructor(
    @Inject(LeafApiClientConfigServiceToken) public config: LeafApiClientConfig,
    public http: HttpClient
  ) {}

  public insertAnalytics(analyticEvents: AnalyticEvent[]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post(this.config.serverUrl + '/analytics', analyticEvents).subscribe(
        () => resolve(),
        () => reject()
      );
    });
  }
}
