import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsViewerComponent } from './statistics-viewer.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    NgxChartsModule
  ],
  declarations: [StatisticsViewerComponent],
  exports: [StatisticsViewerComponent]
})
export class StatisticsViewerModule { }
