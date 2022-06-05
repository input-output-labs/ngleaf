import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessengerApiClient } from './messenger-api-client.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [MessengerApiClient]
})
export class MessengerApiClientModule { }
