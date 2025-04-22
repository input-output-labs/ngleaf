import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { LeafOrganization, selectCurrentOrganization } from '@input-output-labs/ngleaf';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  public currentOrganization$: Observable<LeafOrganization>;

  constructor(private store: Store) {
    this.currentOrganization$ = this.store.pipe(
      select(selectCurrentOrganization)
    );
  }

  ngOnInit() {
  }

}
