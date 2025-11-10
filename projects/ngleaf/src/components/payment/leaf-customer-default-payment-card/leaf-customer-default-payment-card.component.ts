import { Component, Inject } from '@angular/core';
import { filter, map, Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { DOCUMENT } from '@angular/common';

import { PaymentMethod } from '../../../api/models/payment';
import { PaymentApiClientService } from '../../../api/clients/payment-api-client';
import { selectCurrentAccountData } from '../../../store';

@Component({
  standalone: false,
  selector: 'leaf-customer-default-payment-card',
  templateUrl: './leaf-customer-default-payment-card.component.html',
  styleUrls: ['./leaf-customer-default-payment-card.component.scss']
})
export class LeafCustomerDefaultPaymentCardComponent {

  public defaultPaymentCard$: Observable<PaymentMethod>;

  constructor(
    private store: Store,
    private paymentApiClientService: PaymentApiClientService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.defaultPaymentCard$ = this.store.pipe(
      select(selectCurrentAccountData),
      filter((account) => !!account),
      map((account) => account.modules?.paymentmodule?.defaultPaymentMethod)
    );
  }
  

  public performCustomerDefaultPaymentCardCheckout() {
    this.paymentApiClientService.performCustomerDefaultPaymentCardCheckout().subscribe((checkout: {checkout_url: string}) => {
      this.document.location.href = checkout.checkout_url;
    })
  }
}
