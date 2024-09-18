import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LeafAuthHttpClient } from "../auth-http-client/leaf-auth-http-client.service";
import {
  LeafApiClientConfig,
  LeafApiClientConfigServiceToken,
} from "../api-client-config.module";
import { LeafRedirection, LeafRedirectionCreationBatch, LeafRedirectionCreationBatchCreation, LeafRedirectionUpdate } from "../../models/redirection.model";

@Injectable()
export class RedirectionApiClientService {
  public constructor(
    @Inject(LeafApiClientConfigServiceToken) public config: LeafApiClientConfig,
    public authHttp: LeafAuthHttpClient
  ) {}

  public listAllRedirectionCreationBatches(): Observable<LeafRedirectionCreationBatch[]> {
    return this.authHttp.get<LeafRedirectionCreationBatch[]>(`${this.config.serverUrl}/redirections/batches`);
  }

  public findRedirectionCreationBatchById(id: string): Observable<LeafRedirectionCreationBatch> {
    return this.authHttp.get<LeafRedirectionCreationBatch>(`${this.config.serverUrl}/redirections/batches/${id}`);
  }

  public createRedirects(batch: LeafRedirectionCreationBatchCreation): Observable<LeafRedirectionCreationBatch> {
    return this.authHttp.post<LeafRedirectionCreationBatch>(`${this.config.serverUrl}/redirections/batches`, batch);
  }

  public listAllRedirections(batchId: string): Observable<LeafRedirection[]> {
    return this.authHttp.get<LeafRedirection[]>(`${this.config.serverUrl}/redirections?batchId=${batchId}`);
  }

  public findById(id: string, hex: boolean = true): Observable<LeafRedirection> {
    return this.authHttp.get<LeafRedirection>(`${this.config.serverUrl}/redirections/${id}?hex=${hex}`);
  }

  public updateById(id: string, updates: LeafRedirectionUpdate, hex: boolean = true): Observable<LeafRedirection> {
    return this.authHttp.patch<LeafRedirection>(`${this.config.serverUrl}/redirections/${id}?hex=${hex}`, updates);
  }
}
