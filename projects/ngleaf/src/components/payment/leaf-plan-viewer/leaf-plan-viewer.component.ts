import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LeafPaymentPlan } from '../../../api/models';

export interface PlanViewerConfig {
  selectableWithButton: boolean;
  showFeatures: boolean;
  showDescription: boolean;
  showTrialDuration: boolean;
}

@Component({
  standalone: false,
  selector: 'leaf-plan-viewer',
  templateUrl: './leaf-plan-viewer.component.html',
  styleUrls: ['./leaf-plan-viewer.component.scss']
})
export class LeafPlanViewerComponent implements OnInit {
  @Input()
  public plan: LeafPaymentPlan;

  @Input()
  public selected: boolean = false;

  @Input()
  public selectable: boolean = false;

  @Input()
  public selectableWithButton: boolean = true;

  @Input()
  public flat: boolean = false;

  @Input()
  public showFeatures: boolean = true;

  @Input()
  public showDescription: boolean = true;

  @Input()
  public showTrialDuration: boolean = true;

  @Input()
  public disabled: boolean = false;

  @Output()
  public onSelect: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }
}
