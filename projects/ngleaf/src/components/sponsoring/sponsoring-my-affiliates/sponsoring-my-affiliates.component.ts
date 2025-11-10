import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { selectCurrentAccount } from '../../../store/core/session/session.selectors';
import { selectSponsoringProfiles } from '../../../store/index';
import { getModule } from '../../../helpers/index';

@Component({
  standalone: false,
  selector: 'leaf-sponsoring-my-affiliates',
  templateUrl: './sponsoring-my-affiliates.component.html',
  styleUrls: ['./sponsoring-my-affiliates.component.scss']
})
export class SponsoringMyAffiliatesComponent {
  public affiliatedIds$: Observable<string[]>;
  public affiliates$: Observable<string[]>;

  constructor(private store: Store) {
    this.affiliatedIds$ = this.store.pipe(
      select(selectCurrentAccount),
      filter(asyncItem => !asyncItem.status.pending),
      map(asyncItem => asyncItem.data),
      map(currentAccount => getModule(currentAccount, 'sponsoring')?.affiliatedIds)
    );

    this.affiliates$ = this.store.pipe(
      select(selectSponsoringProfiles),
      filter(asyncItem => !asyncItem.status.pending),
      map(asyncItem => asyncItem.data),
      map(sponsoringProfiles => sponsoringProfiles.affiliates),
      filter(affiliatesProfiles => !!affiliatesProfiles),
      map(affiliatesProfiles => affiliatesProfiles.map(affiliateProfile => {
        let description = undefined;
        if (!!affiliateProfile) {
          if (affiliateProfile.firstname || affiliateProfile.lastname) {
            const parts = [];
            if (affiliateProfile.firstname) {
              parts.push(affiliateProfile.firstname);
            }
            if (affiliateProfile.lastname) {
              parts.push(affiliateProfile.lastname);
            }
            description = parts.join(' ');
          } else if(affiliateProfile.username) {
            description = affiliateProfile.username;
          }
        }
        return description;
      }))
    );
  }

}
