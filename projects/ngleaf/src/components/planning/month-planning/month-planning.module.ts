import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthPlanningComponent } from './month-planning.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MonthPlanningComponent],
  exports: [MonthPlanningComponent]
})
export class MonthPlanningModule { }
