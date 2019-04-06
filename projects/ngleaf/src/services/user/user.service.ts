import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LeafConfigServiceToken } from '../leaf-config.module';
import { LeafNotificationService } from '../leaf-notification.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = '';

  constructor(
    @Inject(LeafConfigServiceToken) private config,
    public authHttp: HttpClient,
    public notificationService: LeafNotificationService) {
    this.url = this.config.serverUrl + '/account';
    console.log(this.url);
  }
}
