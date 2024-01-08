import { Component, OnInit, Output, Input, EventEmitter, OnDestroy } from '@angular/core';
import { Observable,ReplaySubject,Subscription,combineLatest,filter, map, take } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { LeafPaymentPlan, LeafPaymentPlanInfo } from '../../../api/models';
import { AsyncType, fetchPlans, fetchSelectedPaymentPlanInfo, selectPaymentPlan, selectPlans, selectSelectPaymentPlan, selectSelectedPaymentPlanInfo } from '../../../store';
import { PlanViewerConfig } from '../leaf-plan-viewer';

@Component({
  selector: 'leaf-plan-selector',
  templateUrl: './leaf-plan-selector.component.html',
  styleUrls: ['./leaf-plan-selector.component.scss']
})
export class LeafPlanSelectorComponent implements OnInit, OnDestroy {
  public availablePlans$: Observable<LeafPaymentPlan[]>;
  public planClassifications$: Observable<string[]>;
  public classifiedAvailablePlans$: Observable<{[key: string]: LeafPaymentPlan[]}>;
  public displayedPlans$: Observable<LeafPaymentPlan[]>;
  public fetchPlansPending$: Observable<boolean>;
  public selectedPlan?: LeafPaymentPlan;
  public selectedClassification$: ReplaySubject<string | undefined> = new ReplaySubject<string | undefined>();

  @Input()
  public showSubmitButton: boolean = true;

  @Input()
  public planViewerConfig: PlanViewerConfig = {
    selectableWithButton: false,
    showFeatures: false,
    showDescription: true,
    showTrialDuration: true,
  };

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
      this.selectedClassification(selectedPlan);
    }));

    this.fetchPlansPending$ = combineLatest([
      asyncAvailablePlans$,
      asyncSelectedPaymentPlanInfo$,
    ]).pipe(
      map(([asyncAvailablePlans, asyncSelectedPaymentPlanInfo]) => asyncAvailablePlans.status.pending || asyncSelectedPaymentPlanInfo.status.pending),
    );

    this.planClassifications$ = this.availablePlans$.pipe(
      map((plans: LeafPaymentPlan[]) => {
        const periods = new Set<string>();
        plans.forEach((plan) => periods.add(plan.pricing.period));
        return Array.from(periods).filter(v => !!v);
      })
    );

    this.classifiedAvailablePlans$ = combineLatest([
      this.availablePlans$,
      this.planClassifications$
    ]).pipe(
      map(([availablePlans, planClassifications]) => {
        const classifiedAvailablePlans = {};
        planClassifications.forEach((planClassification) => {
          classifiedAvailablePlans[planClassification] = availablePlans.filter(availablePlan => planClassification === (availablePlan.pricing.period ?? planClassification));
        })
        return classifiedAvailablePlans;
      })
    );

    this.displayedPlans$ = combineLatest([
      this.classifiedAvailablePlans$,
      this.selectedClassification$
    ]).pipe(
      map(([classifiedAvailablePlans, selectedClassification]) => {
        return classifiedAvailablePlans[selectedClassification];
      })
    );
  }

  selectedClassification(selectedPlan: LeafPaymentPlan) {
    this.classifiedAvailablePlans$.pipe(take(1)).subscribe((classifiedAvailablePlans) => {
      for(let planClassification of Object.keys(classifiedAvailablePlans)) {
        const plans = classifiedAvailablePlans[planClassification];
        if ((plans || []).some(plan => plan.name === selectedPlan.name)) {
          this.selectedClassification$.next(planClassification);
          break;
        }
      }
      this.selectedClassification$.next(Object.keys(classifiedAvailablePlans)[0]);
    })
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
