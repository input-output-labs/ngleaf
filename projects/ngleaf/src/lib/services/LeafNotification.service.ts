import {Injectable} from '@angular/core';

import {LeafAccountModel} from '../models/LeafAccount.model';

import {LeafAuthHttpClient} from './LeafAuthHttpClient.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { LeafNotificationModel } from '../models/LeafNotification.model';

@Injectable({
  providedIn: 'root'
})
export class LeafNotificationService {

  public notifications$: Subject<LeafNotificationModel>;

  constructor() {
    this.notifications$ = new Subject();
  }

  public emit(error: LeafNotificationModel):void {
    this.notifications$.next(error);
  }
}
