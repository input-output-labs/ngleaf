import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationItemComponent } from './notification-item.component';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    /* Core deps */
    CommonModule,
    TranslateModule,
    /* Material deps */
    MatIconModule,
  ],
  declarations: [NotificationItemComponent],
  exports: [NotificationItemComponent]
})
export class NotificationItemModule { }
