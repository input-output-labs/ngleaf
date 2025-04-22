import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LeafAuthHttpClient } from '../auth-http-client/leaf-auth-http-client.service';
import { LeafApiClientConfig, LeafApiClientConfigServiceToken } from '../api-client-config.module';
import { LeafInvoice, LeafPaymentPlan, LeafPaymentPlanFeature, LeafPaymentPlanInfo } from '../../models';

@Injectable()
export class PaymentApiClientService {
  public constructor(
    @Inject(LeafApiClientConfigServiceToken) public config: LeafApiClientConfig,
    public authHttp: LeafAuthHttpClient
    ) {}

    public fetchPlans(): Observable<LeafPaymentPlan[]> {
      return this.authHttp.get<LeafPaymentPlan[]>(this.config.serverUrl + '/payment/plans');
    }

    public fetchAllPlans(): Observable<LeafPaymentPlan[]> {
      return this.authHttp.get<LeafPaymentPlan[]>(this.config.serverUrl + '/payment/plans/all');
    }

    public fetchSelectedPaymentPlanInfo(): Observable<LeafPaymentPlanInfo> {
      return this.authHttp.get<LeafPaymentPlanInfo>(this.config.serverUrl + '/payment/plans/selected');
    }

    public fetchSelectedPaymentPlanInfoById(id: string): Observable<LeafPaymentPlanInfo> {
      return this.authHttp.get<LeafPaymentPlanInfo>(`${this.config.serverUrl}/payment/plans/selected/${id}`);
    }

    public selectPaymentPlan(plan: LeafPaymentPlan): Observable<LeafPaymentPlan> {
      return this.authHttp.post<LeafPaymentPlan>(this.config.serverUrl + '/payment/plans/selected', plan);
    }

    public performPlanCheckout(): Observable<{checkout_url: string}> {
      return this.authHttp.post<{checkout_url: string}>(this.config.serverUrl + '/payment/plans/paymentmethod', {});
    }

    public performCustomerDefaultPaymentCardCheckout(): Observable<{checkout_url: string}> {
      return this.authHttp.post<{checkout_url: string}>(this.config.serverUrl + '/payment/customer/paymentmethod', {});
    }

    public fetchInvoices(invoicesType: string): Observable<LeafInvoice[]> {
      return this.authHttp.get<LeafInvoice[]>(`${this.config.serverUrl}/payment/invoices?type=${invoicesType}`);
    }

    public tierPlanSelection(organizationId: string, planName: string): Observable<LeafPaymentPlan> {
      return this.authHttp.post<LeafPaymentPlan>(this.config.serverUrl + '/payment/plans/tier-selection', {
        organizationId,
        planName
      });
    }

    public updateSelectedPlanFeatures(organizationId: string, features: LeafPaymentPlanFeature[]): Observable<LeafPaymentPlan> {
      return this.authHttp.post<LeafPaymentPlan>(`${this.config.serverUrl}/payment/plans/selected/${organizationId}/features`, features);
    }
}
