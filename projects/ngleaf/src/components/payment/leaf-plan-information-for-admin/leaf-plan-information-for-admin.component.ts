import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PaymentApiClientService } from '../../../api/clients/payment-api-client';
import { BehaviorSubject, Subscription } from 'rxjs';
import { LeafPaymentPlan, LeafPaymentPlanFeature, LeafPaymentPlanInfo } from '../../../api';
import { ConfirmDialogModel, LeafConfirmDialogComponent } from '../../common';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-leaf-plan-information-for-admin',
  templateUrl: './leaf-plan-information-for-admin.component.html',
  styleUrls: ['./leaf-plan-information-for-admin.component.scss']
})
export class LeafPlanInformationForAdminComponent implements OnInit, OnDestroy {

  @Input()
  public organizationId: string;

  public allPlans$: BehaviorSubject<LeafPaymentPlan[]> = new BehaviorSubject<LeafPaymentPlan[]>([]);
  public paymentPlanInfo$: BehaviorSubject<LeafPaymentPlanInfo | null> = new BehaviorSubject<LeafPaymentPlanInfo | null>(null);

  public planCopy: LeafPaymentPlan = null;
  public featuresTouched: boolean = false;
  public updatingFeatures: boolean = false;
  public updatingPlan: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(private paymentApiClient: PaymentApiClientService, private dialog: MatDialog, private snackBar: MatSnackBar, private translate: TranslateService) {
    this.subscriptions.push(this.paymentPlanInfo$.subscribe((planInfo) => {
      if (planInfo) {
        this.planCopy = JSON.parse(JSON.stringify(planInfo.plan));
      }
    }));
  }

  ngOnInit() {
    this.refreshData();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public refreshData() {
    this.paymentApiClient.fetchAllPlans().subscribe((plans) => {
      this.allPlans$.next(plans);
    });
    this.paymentApiClient.fetchSelectedPaymentPlanInfoById(this.organizationId).subscribe((planInfo) => {
      this.paymentPlanInfo$.next(planInfo);
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

  public getFeature(feature: string): LeafPaymentPlanFeature {
    return this.planCopy.features.find((f) => f.name === feature);
  }

  public onRightValueChange(feature: string, event: any) {
    this.getFeature(feature).value = event.checked ? "true" : "false";
    this.featuresTouched = true;
  }

  public onNumberRightValueChange(feature: string, value: number) {
    this.getFeature(feature).value = value.toString();
    this.featuresTouched = true;
  }

  public addtoNumberRight(feature: string, value: number) {
    const currentValue = parseInt(this.getFeature(feature).value);
    this.getFeature(feature).value = (currentValue + value).toString();
    this.featuresTouched = true;
  }

  public updatePlanFeatures() {
    if (this.featuresTouched) {
      // this.paymentApiClient.updatePlan(this.planCopy).subscribe();
      
      const dialogRef = this.dialog.open(LeafConfirmDialogComponent, {
        maxWidth: "400px",
        data: new ConfirmDialogModel(
          "Update plan's features",
          "Are you sure you want to update the plan's features?"
        )
      });

      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult) {
          // Handle confirmation
          this.updatingFeatures = true;
          this.paymentApiClient.updateSelectedPlanFeatures(this.organizationId, this.planCopy.features).subscribe((plan) => {
            this.refreshData();
            this.updatingFeatures = false;
            this.featuresTouched = false;
            this.snackBar.open(
              this.translate.instant('leaf.payment-plan-information-for-admin.planFeaturesUpdatedSuccessfully'),
              undefined,
              { duration: 2000 }
            );
          });
        }
      });
    }
  }

  public onPlanChange(event: any) {
    const dialogRef = this.dialog.open(LeafConfirmDialogComponent, {
      maxWidth: "400px",
      data: new ConfirmDialogModel(
        `Update Plan to ${event.value}`,
        "Are you sure you want to change the plan?"
      )
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.updatingPlan = true;
        this.paymentApiClient.tierPlanSelection(this.organizationId, event.value).subscribe((plan) => {
          this.refreshData();
          this.updatingPlan = false;
          this.snackBar.open(
            this.translate.instant('leaf.payment-plan-information-for-admin.planUpdatedSuccessfully'),
            undefined,
            { duration: 2000 }
          );
        });
      }
    });
  }
}
