import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SponsoringApiClientService } from '../../../api';
import { setSponsoringProfilesCall } from '../../../store';

@Injectable()
export class LeafSponsoringResolver implements Resolve<void> {

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
