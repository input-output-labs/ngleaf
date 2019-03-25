import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeafAuthHttpClient } from './LeafAuthHttpClient.service';
import { map } from 'rxjs/operators';
import { LeafFileModel } from '../models/LeafFile.model';

@Injectable()
export class LeafUploadFileService {

  private url = '';

  constructor(private http: LeafAuthHttpClient) {}

  public init(serverUrl) {
    this.url = serverUrl + '/api/files';
  }

  pushFileToStorage(file: File): Observable<string> {
    let formdata: FormData = new FormData();

    formdata.append('file', file);

    return this.http.post(this.url, formdata, {
      reportProgress: true
    }).pipe(
      map((body: LeafFileModel) => body.url
    ));
  }
}
