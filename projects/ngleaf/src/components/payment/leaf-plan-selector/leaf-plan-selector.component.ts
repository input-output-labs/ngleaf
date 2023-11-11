import { Component, OnInit, Output, Input, EventEmitter, OnDestroy } from '@angular/core';
import { Observable,Subscription,filter, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { LeafPaymentPlan } from '../../../api/models';
import { AsyncType, fetchPlans, selectPaymentPlan, selectPlans } from '../../../store';

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

  private subscriptions: Subscription[] = [];

  constructor(private store: Store) {
    const asyncAvailablePlans$ = store.select(selectPlans);
    this.availablePlans$ = asyncAvailablePlans$.pipe(
      filter((asyncItem: AsyncType<LeafPaymentPlan[]>) => !asyncItem.status.pending),
      map((asyncItem: AsyncType<LeafPaymentPlan[]>) => asyncItem.data),
    );
    this.fetchPlansPending$ = asyncAvailablePlans$.pipe(
      map((asyncItem: AsyncType<LeafPaymentPlan[]>) => asyncItem.status.pending),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit() {
    this.store.dispatch(fetchPlans());
  }

  public submit() {
    if (this.selectedPlan) {
      this.store.dispatch(selectPaymentPlan({selectedPlan: this.selectedPlan}));
    }
  }

  public selectPlan(plan: LeafPaymentPlan) {
    this.selectedPlan = plan;
  }
}
