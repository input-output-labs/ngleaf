import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsApiClientService } from './statistics-api-client.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [StatisticsApiClientService]
})
export class StatisticsApiClientModule { }
