import { Component, Inject, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { LeafPaymentPlan, LeafPaymentPlanInfo } from '../../../api/models';
import { AsyncType, fetchSelectedPaymentPlanInfo, selectCurrentOrganization, selectSelectedPaymentPlanInfo } from '../../../store';
import { Observable, Subscription, filter, map } from 'rxjs';
import { PaymentApiClientService } from '../../../api/clients/payment-api-client';
import { DOCUMENT } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LeafPlanSelectorDialogComponent } from '../leaf-plan-selector-dialog';
import { isMobile } from '../../../helpers';
import { PlanViewerConfig } from '../leaf-plan-viewer';
import { LeafConfigServiceToken } from '../../../services/leaf-config.module';
import { LeafConfig } from '../../../models';

@Component({
  standalone: false,
  selector: 'leaf-selected-payment-plan',
  templateUrl: './leaf-selected-payment-plan.component.html',
  styleUrls: ['./leaf-selected-payment-plan.component.scss']
})
export class LeafSelectedPaymentPlanComponent implements OnInit, OnDestroy {
  public paymentPlanInfo$: Observable<LeafPaymentPlanInfo>;
  public isMobile = isMobile();
  private subscriptions: Subscription[] = [];

  @Input()
  public planViewerConfig: PlanViewerConfig = {
    selectableWithButton: false,
    showFeatures: false,
    showDescription: true,
    showTrialDuration: false,
  };

  @Input()
  public canChangePaymentPlan: boolean = true;

  constructor(
    private store: Store,
    private paymentApiClientService: PaymentApiClientService,
    public dialog: MatDialog,
    @Inject(DOCUMENT) private document: Document,
    @Inject(LeafConfigServiceToken) private config: LeafConfig
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
    const dialogWidth = this.config?.uiCustomization?.dialogWidth?.large || '800px';
    const dialogRef = this.dialog.open(LeafPlanSelectorDialogComponent, {
      width: dialogWidth,
      maxWidth: dialogWidth,
      data: this.planViewerConfig
    });

    dialogRef.afterClosed().subscribe(result => {
      this.store.dispatch(fetchSelectedPaymentPlanInfo());
    });
  }

  public getRemainingDays(plan: LeafPaymentPlan): number {
    if (plan.inTrial) {
      const now = new Date();
      const trialEnd = new Date(plan.startedAt);
      trialEnd.setDate(trialEnd.getDate() + plan.trialDuration);
      const diffMillis = trialEnd.getTime() - now.getTime();
      const diffDays = Math.ceil(diffMillis / (24 * 60 * 60 * 1000));
      return diffDays;
    }
    return 0;
  }
}
