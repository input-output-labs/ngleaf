import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailingApiClientService } from './emailing-api-client.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [EmailingApiClientService]
})
export class EmailingApiClientModule { }
