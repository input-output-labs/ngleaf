import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsPageComponent } from './statistics-page.component';
import { StatisticsViewerModule } from '../../common/statistics-viewer/statistics-viewer.module';
import { StatisticsModule } from '../../../services/index';

@NgModule({
  imports: [
    CommonModule,
    StatisticsModule,
    StatisticsViewerModule
  ],
  declarations: [StatisticsPageComponent]
})
export class StatisticsPageModule { }
