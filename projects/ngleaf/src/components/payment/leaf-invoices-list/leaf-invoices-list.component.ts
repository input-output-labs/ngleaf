import { Component, OnInit, Input } from '@angular/core';
import { LeafInvoice, LeafPaymentPlan } from '../../../api/models';
import { Store } from '@ngrx/store';
import { Observable, filter, map } from 'rxjs';
import { AsyncType, fetchInvoices, selectInvoices } from '../../../store';

@Component({
  selector: 'leaf-invoices-list',
  templateUrl: './leaf-invoices-list.component.html',
  styleUrls: ['./leaf-invoices-list.component.scss']
})
export class LeafInvoicesListComponent implements OnInit {
  displayedColumns: string[] = ['date', 'amount', 'status', 'download'];
  @Input()
  public invoicesType: string = null;
  public invoices$: Observable<LeafInvoice[]>;
  public fetchInvoicesPending$: Observable<boolean>;
  public readonly invitationStatusToColorMapping = {
    draft: 'accent',
    open: 'info',
    paid: 'primary',
    uncollectible: 'error',
    void: 'info',
  };

  constructor(private store: Store) {
    const asyncInvoices$ = this.store.select(selectInvoices);
    this.invoices$ = asyncInvoices$.pipe(
      filter((asyncItem: AsyncType<LeafInvoice[]>) => !asyncItem.status.pending),
      map((asyncItem: AsyncType<LeafInvoice[]>) => asyncItem.data),
    );

    this.fetchInvoicesPending$ = asyncInvoices$.pipe(
      map((asyncItem: AsyncType<LeafInvoice[]>) => asyncItem.status.pending),
    );
  }

  ngOnInit() {
    this.fetchInvoices(this.invoicesType);
  }

  private fetchInvoices(invoicesType: string) {
    this.store.dispatch(fetchInvoices({invoicesType}));
  }
}
