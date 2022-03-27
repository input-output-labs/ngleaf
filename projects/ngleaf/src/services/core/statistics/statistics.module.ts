import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsApiClientModule } from '../../../api/clients/statistics-api-client/statistics-api-client.module';
import { StatisticsService } from './statistics.service';

@NgModule({
  imports: [
    CommonModule,
    StatisticsApiClientModule
  ],
  providers: [StatisticsService]
})
export class StatisticsModule { }
