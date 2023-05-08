import { Component, Input, OnInit } from '@angular/core';
import { LeafNotificationModel } from '../../../api/models/notifications.model';

@Component({
  selector: 'leaf-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss']
})
export class NotificationItemComponent implements OnInit {

  @Input()
  public notification: LeafNotificationModel;

  constructor() { }

  ngOnInit() {
  }

}
