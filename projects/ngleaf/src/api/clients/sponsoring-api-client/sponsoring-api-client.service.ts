import { Inject, Injectable } from "@angular/core";
import { LeafAuthHttpClient } from "../auth-http-client/leaf-auth-http-client.service";

import { Observable } from "rxjs";

import {
  LeafApiClientConfig,
  LeafApiClientConfigServiceToken,
} from "../api-client-config.module";
import { LeafAccountModel, SponsoringProfileModel } from "../../models/index";

@Injectable()
export class SponsoringApiClientService {
  public constructor(
    @Inject(LeafApiClientConfigServiceToken) public config: LeafApiClientConfig,
    public authHttp: LeafAuthHttpClient
  ) {}

  public getSponsoringProfiles(): Observable<SponsoringProfileModel> {
    return this.authHttp.get<SponsoringProfileModel>(
      this.config.serverUrl + "/account/me/sponsoring"
    );
  }

  public setSponsor(sponsorId: string): Observable<LeafAccountModel> {
    return this.authHttp.post<LeafAccountModel>(
      this.config.serverUrl + "/account/me/sponsoring/sponsor",
      { sponsorId }
    );
  }

  public updateSponsorCode(accountId: string, sponsorCode: string): Observable<LeafAccountModel> {
    return this.authHttp.post<LeafAccountModel>(
      `${this.config.serverUrl}/account/${accountId}/sponsoring/sponsorcode`,
      { sponsorCode }
    );
  }
}
