import { Injectable, Inject } from "@angular/core";
import { map, Observable, take } from "rxjs";

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

    return this.http
      .post(this.config.serverUrl + "/files", formdata, {
        reportProgress: true,
      }).pipe(take(1), map((uploadedFile: LeafFileModel) => uploadedFile?.url));
  }
}
