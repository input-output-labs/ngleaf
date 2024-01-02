import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { LeafPaymentPlanInfo } from '../../../api/models';
import { AsyncType, fetchSelectedPaymentPlanInfo, selectCurrentOrganization, selectSelectedPaymentPlanInfo } from '../../../store';
import { Observable, Subscription, filter, map } from 'rxjs';
import { PaymentApiClientService } from '../../../api/clients/payment-api-client';
import { DOCUMENT } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LeafPlanSelectorDialogComponent } from '../leaf-plan-selector-dialog';
import { isMobile } from '../../../helpers';

@Component({
  selector: 'leaf-selected-payment-plan',
  templateUrl: './leaf-selected-payment-plan.component.html',
  styleUrls: ['./leaf-selected-payment-plan.component.scss']
})
export class LeafSelectedPaymentPlanComponent implements OnInit, OnDestroy {
  public paymentPlanInfo$: Observable<LeafPaymentPlanInfo>;
  public isMobile = isMobile();
  private subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private paymentApiClientService: PaymentApiClientService,
    public dialog: MatDialog,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.paymentPlanInfo$ = store.select(selectSelectedPaymentPlanInfo).pipe(
      filter((asyncItem: AsyncType<LeafPaymentPlanInfo>) => !asyncItem.status.pending),
      map((asyncItem: AsyncType<LeafPaymentPlanInfo>) => asyncItem.data),
    );
  }

  ngOnInit() {
    this.subscriptions.push(this.store.select(selectCurrentOrganization).subscribe(() => this.store.dispatch(fetchSelectedPaymentPlanInfo())));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
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
