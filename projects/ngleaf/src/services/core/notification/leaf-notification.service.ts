import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { emitNotification } from '../../../store/core/notification/notification.actions';
import { LeafNotificationModel } from '../../../models/index';

@Injectable()
export class LeafNotificationService {

  constructor(private store: Store) {}

  public emit(notification: LeafNotificationModel): void {
    this.store.dispatch(emitNotification({notification}));
  }
}
