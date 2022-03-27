import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { setStatisticsCall } from '../../../store/index';
import { StatisticsApiClientService } from '../../../api/clients/statistics-api-client/statistics-api-client.service';

@Injectable()
export class StatisticsService {

  constructor(private statisticsApiClient: StatisticsApiClientService, private store: Store) { }

  public fetchStatistics() {
    this.store.dispatch(
      setStatisticsCall({
        call: this.statisticsApiClient.fetchStatistics()
      })
    );
  }
}
