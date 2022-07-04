import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';

import {
  DayPlanningModule,
  MonthPlanningModule,
  SectionsBarModule,
} from '@input-output-labs/ngleaf';

import { PlanningComponent } from './planning.component';


@NgModule({
  imports: [
    /* Common deps */
    CommonModule,
    /* Material deps */
    MatDividerModule,
    /* Leaf deps */
    SectionsBarModule,
    DayPlanningModule,
    MonthPlanningModule,
  ],
  declarations: [PlanningComponent]
})
export class PlanningModule { }
