import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LeafAuthHttpClient } from './leaf-auth-http-client.service';
import { map } from 'rxjs/operators';
import { LeafFileModel } from '../models/leaf-file.model';

@Injectable()
export class LeafUploadFileService {
  private url = '';

  constructor(private http: LeafAuthHttpClient) {}

  public init(serverUrl) {
    this.url = serverUrl + '/api/files';
  }

  pushFileToStorage(file: File): Observable<string> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    return this.http
      .post(this.url, formdata, {
        reportProgress: true,
      })
      .pipe(map((body: LeafFileModel) => body.url));
  }
}
