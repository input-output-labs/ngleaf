import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LeafAuthHttpClient } from './leaf-auth-http-client.service';
import { map } from 'rxjs/operators';
import { LeafFileModel } from '../models/leaf-file.model';
import { LeafConfigServiceToken } from './leaf-config.module';

@Injectable()
export class LeafUploadFileService {

  constructor(
    @Inject(LeafConfigServiceToken) private config,
    private http: LeafAuthHttpClient) {}

  pushFileToStorage(file: File): Observable<string> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    return this.http
      .post(this.config.serverUrl + '/files', formdata, {
        reportProgress: true,
      })
      .pipe(map((body: LeafFileModel) => body.url));
  }
}
