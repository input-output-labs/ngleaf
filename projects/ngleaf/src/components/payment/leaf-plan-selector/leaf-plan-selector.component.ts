import { Component, OnInit, Output, Input, EventEmitter, OnDestroy } from '@angular/core';
import { Observable,Subscription,combineLatest,filter, map, take } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { LeafPaymentPlan, LeafPaymentPlanInfo } from '../../../api/models';
import { AsyncType, fetchPlans, fetchSelectedPaymentPlanInfo, selectPaymentPlan, selectPlans, selectSelectPaymentPlan, selectSelectedPaymentPlanInfo } from '../../../store';

@Component({
  selector: 'leaf-plan-selector',
  templateUrl: './leaf-plan-selector.component.html',
  styleUrls: ['./leaf-plan-selector.component.scss']
})
export class LeafPlanSelectorComponent implements OnInit, OnDestroy {
  public availablePlans$: Observable<LeafPaymentPlan[]>;
  public fetchPlansPending$: Observable<boolean>;
  public selectedPlan?: LeafPaymentPlan;

  @Input()
  public showSubmitButton: boolean = true;

  @Output()
  public onSelect: EventEmitter<LeafPaymentPlan> = new EventEmitter<LeafPaymentPlan>();

  @Output()
  public onSubmitted: EventEmitter<void> = new EventEmitter<void>();

  private subscriptions: Subscription[] = [];

  constructor(private store: Store) {
    this.store.dispatch(fetchPlans());
    this.store.dispatch(fetchSelectedPaymentPlanInfo());
    const asyncAvailablePlans$ = store.select(selectPlans);
    this.availablePlans$ = asyncAvailablePlans$.pipe(
      filter((asyncItem: AsyncType<LeafPaymentPlan[]>) => !asyncItem.status.pending),
      map((asyncItem: AsyncType<LeafPaymentPlan[]>) => asyncItem.data),
    );
    const asyncSelectedPaymentPlanInfo$ = store.select(selectSelectedPaymentPlanInfo);
    asyncSelectedPaymentPlanInfo$.pipe(
      filter((asyncItem: AsyncType<LeafPaymentPlanInfo>) => !asyncItem.status.pending),
      map((asyncItem: AsyncType<LeafPaymentPlanInfo>) => asyncItem.data),
      take(1),
      map((paymentPlanInfo: LeafPaymentPlanInfo) => paymentPlanInfo.plan),
    ).subscribe((selectedPlan => {
      if (selectedPlan) {
        this.selectedPlan = selectedPlan;
      }
    }));

    this.fetchPlansPending$ = combineLatest(
      asyncAvailablePlans$,
      asyncSelectedPaymentPlanInfo$,
    ).pipe(
      map(([asyncAvailablePlans, asyncSelectedPaymentPlanInfo]) => asyncAvailablePlans.status.pending || asyncSelectedPaymentPlanInfo.status.pending),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit() {}

  public submit() {
    if (this.selectedPlan) {
      this.store.dispatch(selectPaymentPlan({selectedPlan: this.selectedPlan}));

      this.store.pipe(
        select(selectSelectPaymentPlan),
        filter((asyncItem: AsyncType<LeafPaymentPlan>) => !asyncItem.status.pending)
      ).subscribe((asyncItem: AsyncType<LeafPaymentPlan>) => {
        if (asyncItem.status.success) {
          this.onSubmitted.emit();
        }
      })
    }
  }

  public selectPlan(plan: LeafPaymentPlan) {
    this.selectedPlan = plan;
    this.onSelect.emit(this.selectedPlan);
  }
}
