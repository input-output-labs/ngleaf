import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { LeafNotificationModel } from '../../../api/models/notifications.model';

@Component({
  standalone: false,
  selector: 'leaf-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NotificationItemComponent implements OnInit {

  @Input()
  public notification: LeafNotificationModel;

  @Input()
  public clickable: boolean;

  constructor() { }

  ngOnInit() {
  }

}
