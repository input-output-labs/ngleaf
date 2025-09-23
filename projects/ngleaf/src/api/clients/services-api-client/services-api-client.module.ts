import { NgModule } from '@angular/core';
import { ServicesApiClientService } from './services-api-client.service';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ServicesApiClientService
  ]
})
export class ServicesApiClientModule { }
