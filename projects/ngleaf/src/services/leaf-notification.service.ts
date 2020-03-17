import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { LeafNotificationModel } from '../models/index';

@Injectable()
export class LeafNotificationService {
  public notifications$: Subject<LeafNotificationModel>;

  constructor() {
    this.notifications$ = new Subject();
  }

  public emit(error: LeafNotificationModel): void {
    this.notifications$.next(error);
  }
}
