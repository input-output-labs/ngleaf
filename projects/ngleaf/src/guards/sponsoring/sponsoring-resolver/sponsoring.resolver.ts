import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SponsoringApiClientService } from '../../../api';
import { setSponsoringProfilesCall } from '../../../store';

@Injectable()
export class LeafSponsoringResolver  {

  constructor(
    private store: Store,
    private sponsoringApiClient: SponsoringApiClientService
  ) {}
  resolve() {
    this.store.dispatch(setSponsoringProfilesCall({
      call: this.sponsoringApiClient.getSponsoringProfiles()
    }))
    return;
  }
}
