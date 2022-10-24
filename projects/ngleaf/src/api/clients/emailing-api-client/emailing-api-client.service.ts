import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LeafAuthHttpClient } from "../auth-http-client/leaf-auth-http-client.service";
import {
  LeafApiClientConfig,
  LeafApiClientConfigServiceToken,
} from "../api-client-config.module";
import { LeafEmailingCategory } from "../../models/emailing/leaf-emailing-category.model";
import { LeafBatchCreationAction } from "../../models/emailing/leaf-batch-creation-action.model";

@Injectable()
export class EmailingApiClientService {
  public constructor(
    @Inject(LeafApiClientConfigServiceToken) public config: LeafApiClientConfig,
    public authHttp: LeafAuthHttpClient
  ) {}

  public fetchCategories(): Observable<LeafEmailingCategory[]> {
    return this.authHttp.get<LeafEmailingCategory[]>(
      this.config.serverUrl + "/emailing/categories"
    );
  }

  public fetchCategory(id: string): Observable<LeafEmailingCategory> {
    return this.authHttp.get<LeafEmailingCategory>(
      this.config.serverUrl + "/emailing/categories/" + id
    );
  }

  public createCategory(
    category: LeafEmailingCategory
  ): Observable<LeafEmailingCategory> {
    return this.authHttp.post<LeafEmailingCategory>(
      this.config.serverUrl + "/emailing/categories",
      category
    );
  }

  public updateCategory(
    id: string,
    category: LeafEmailingCategory
  ): Observable<LeafEmailingCategory> {
    return this.authHttp.put<LeafEmailingCategory>(
      this.config.serverUrl + "/emailing/categories/" + id,
      category
    );
  }

  public deleteCategory(id: string): Observable<LeafEmailingCategory> {
    return this.authHttp.delete<LeafEmailingCategory>(
      this.config.serverUrl + "/emailing/categories/" + id
    );
  }

  public testEmailBatch(batchCreation: LeafBatchCreationAction) {
    return this.authHttp.post<any>(
      this.config.serverUrl + "/emailing/batch/test",
      batchCreation
    );
  }

  public emailBatch(batchCreation: LeafBatchCreationAction) {
    return this.authHttp.post<any>(
      this.config.serverUrl + "/emailing/batch",
      batchCreation
    );
  }
}
