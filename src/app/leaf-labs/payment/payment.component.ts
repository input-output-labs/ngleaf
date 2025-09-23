import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { LeafOrganization, selectCurrentOrganization } from '../../../../projects/ngleaf/src/public-api';
import { LeafService } from '../../../../projects/ngleaf/src/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  public currentOrganization$: Observable<LeafOrganization>;
  public availableServices: Partial<LeafService>[] = [
    { key: 'premium-support', icon: 'support_agent', unitPrice: 5000 }, // $50.00
    { key: 'api-access', icon: 'api', unitPrice: 2500 },                // $25.00
    { key: 'analytics', icon: 'analytics', unitPrice: 1000 }            // $10.00
  ];

  constructor(private store: Store) {
    this.currentOrganization$ = this.store.pipe(
      select(selectCurrentOrganization)
    );
  }

  ngOnInit() {
  }

  onServiceCreated(service: LeafService) {
    console.log('service created', service);
  }

  onServiceCreationError(error: any) {
    console.log('service creation error', error);
  }
}
