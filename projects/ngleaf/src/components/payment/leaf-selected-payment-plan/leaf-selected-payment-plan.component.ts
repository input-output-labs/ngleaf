import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LeafPaymentPlanInfo } from '../../../api/models';
import { AsyncType, fetchSelectedPaymentPlanInfo, selectSelectedPaymentPlanInfo } from '../../../store';
import { Observable, filter, map } from 'rxjs';
import { PaymentApiClientService } from '../../../api/clients/payment-api-client';
import { DOCUMENT } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LeafPlanSelectorDialogComponent } from '../leaf-plan-selector-dialog';

@Component({
  selector: 'leaf-selected-payment-plan',
  templateUrl: './leaf-selected-payment-plan.component.html',
  styleUrls: ['./leaf-selected-payment-plan.component.scss']
})
export class LeafSelectedPaymentPlanComponent implements OnInit {
  public paymentPlanInfo$: Observable<LeafPaymentPlanInfo>;

  constructor(
    private store: Store,
    private paymentApiClientService: PaymentApiClientService,
    public dialog: MatDialog,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.store.dispatch(fetchSelectedPaymentPlanInfo());
    this.paymentPlanInfo$ = store.select(selectSelectedPaymentPlanInfo).pipe(
      filter((asyncItem: AsyncType<LeafPaymentPlanInfo>) => !asyncItem.status.pending),
      map((asyncItem: AsyncType<LeafPaymentPlanInfo>) => asyncItem.data),
    );
  }

  ngOnInit() {
  }

  public performPlanCheckout() {
    this.paymentApiClientService.performPlanCheckout().subscribe((checkout: {checkout_url: string}) => {
      this.document.location.href = checkout.checkout_url;
    })
  }

  public changePaymentPlan() {
    const dialogRef = this.dialog.open(LeafPlanSelectorDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.store.dispatch(fetchSelectedPaymentPlanInfo());
    });
  }
}
