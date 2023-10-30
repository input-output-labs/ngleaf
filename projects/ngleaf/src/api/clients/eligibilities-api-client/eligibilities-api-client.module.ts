import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EligibilitiesApiClientService } from './eligibilities-api-client.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [EligibilitiesApiClientService]
})
export class EligibilitiesApiClientModule { }
