import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedirectionApiClientService } from './redirection-api-client.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [RedirectionApiClientService]
})
export class RedirectionApiClientModule { }
