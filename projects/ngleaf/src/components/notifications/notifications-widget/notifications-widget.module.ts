import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsWidgetComponent } from './notifications-widget.component';
import {MatBadgeModule} from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { NotificationItemModule } from '../notification-item/notification-item.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    /* Core deps */
    CommonModule,
    RouterModule,
    /* Material deps */
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    /* Leaf deps */
    NotificationItemModule,
  ],
  declarations: [NotificationsWidgetComponent],
  exports: [NotificationsWidgetComponent],
})
export class NotificationsWidgetModule { }
