import { Injectable, Inject } from "@angular/core";
import { Observable, Subject } from "rxjs";

import { LeafFileModel } from "../../api/models/index";
import { LeafConfigServiceToken } from "../leaf-config.module";
import { LeafAuthHttpClient } from "../../api/clients/index";

@Injectable()
export class LeafUploadFileService {
  constructor(
    @Inject(LeafConfigServiceToken) private config,
    private http: LeafAuthHttpClient
  ) {}

  pushFileToStorage(file: Blob): Observable<string> {
    const formdata: FormData = new FormData();

    formdata.append("file", file);

    const url$ = new Subject<string>();

    this.http
      .post(this.config.serverUrl + "/files", formdata, {
        reportProgress: true,
      })
      .subscribe((uploadedFile: LeafFileModel) => url$.next(uploadedFile.url));

    return url$;
  }
}
