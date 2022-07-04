import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayPlanningComponent } from './day-planning.component';

@NgModule({
  imports: [
    /* Core deps */
    CommonModule
    /* Material deps */
    /* Leaf deps */
  ],
  declarations: [DayPlanningComponent],
  exports: [DayPlanningComponent]
})
export class DayPlanningModule { }
