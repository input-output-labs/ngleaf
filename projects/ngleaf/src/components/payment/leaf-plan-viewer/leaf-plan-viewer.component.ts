import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LeafPaymentPlan } from '../../../api/models';

@Component({
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

  @Output()
  public onSelect: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

}
