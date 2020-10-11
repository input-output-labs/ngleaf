import { Injectable, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { LeafFileModel } from '../../models/index';
import { LeafConfigServiceToken } from '../leaf-config.module';
import { LeafAuthHttpClient } from '../core/auth-http-client/leaf-auth-http-client.service';
import { LeafNotificationService } from '../core/notification/leaf-notification.service';

@Injectable()
export class LeafUploadFileService {

  constructor(
    public notificationService: LeafNotificationService,
    @Inject(LeafConfigServiceToken) private config,
    private http: LeafAuthHttpClient) {}

  pushFileToStorage(file: File): Observable<string> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    this.notificationService.emit({
      id: 'successChangeUsername',
      category: 'session',
      message: 'Name changed'
    });

    const url$ = new Subject<string>();

    this.http.post(this.config.serverUrl + '/files', formdata, { reportProgress: true }).subscribe(
      (uploadedFile: LeafFileModel) => {
        this.notificationService.emit({
          id: 'successUploadFile',
          category: 'file-upload',
          message: 'File successfully uploaded'
        });
        url$.next(uploadedFile.url);
      },
      () => {
        this.notificationService.emit({
          id: 'failureUploadFile',
          category: 'file-upload',
          message: 'Error during file upload'
        });
        url$.next(null);
      }
    );


    return url$;
  }
}
