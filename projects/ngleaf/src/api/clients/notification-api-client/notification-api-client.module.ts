import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationApiClientService } from './notification-api-client.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [NotificationApiClientService]
})
export class NotificationApiClientModule { }
