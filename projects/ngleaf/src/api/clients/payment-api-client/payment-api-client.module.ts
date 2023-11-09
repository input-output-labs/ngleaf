import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentApiClientService } from './payment-api-client.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [PaymentApiClientService]
})
export class PaymentApiClientModule { }
