import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LeafAuthHttpClient } from '../auth-http-client/leaf-auth-http-client.service';
import { LeafApiClientConfig, LeafApiClientConfigServiceToken } from '../api-client-config.module';
import { LeafPaymentPlan } from '../../models';

@Injectable()
export class PaymentApiClientService {
  public constructor(
    @Inject(LeafApiClientConfigServiceToken) public config: LeafApiClientConfig,
    public authHttp: LeafAuthHttpClient
    ) {}

    public fetchPlans(): Observable<LeafPaymentPlan[]> {
      // TODO: change that if needed
      return this.authHttp.get<LeafPaymentPlan[]>(this.config.serverUrl + '/payment/plans');
    }

    public selectPaymentPlan(plan: LeafPaymentPlan): Observable<LeafPaymentPlan> {
      // TODO: change that if needed
      return this.authHttp.post<LeafPaymentPlan>(this.config.serverUrl + '/payment/plans/selected', plan);
    }
}
