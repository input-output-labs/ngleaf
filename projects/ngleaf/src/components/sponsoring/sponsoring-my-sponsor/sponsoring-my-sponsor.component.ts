import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import { selectCurrentAccount } from '../../../store/core/session/session.selectors';
import { getModule } from '../../../helpers/index';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { selectSetSponsor, selectSponsoringProfiles, setSetSponsorCall } from '../../../store/index';
import { SponsoringApiClientService } from '../../../api/clients/index';

@Component({
  selector: 'leaf-sponsoring-my-sponsor',
  templateUrl: './sponsoring-my-sponsor.component.html',
  styleUrls: ['./sponsoring-my-sponsor.component.scss']
})
export class SponsoringMySponsorComponent {
  public sponsorId$: Observable<string>;
  public sponsor$: Observable<string | undefined>;
  public mySponsorFormControl: FormControl;

  constructor(private store: Store, private sponsoringApiClientService: SponsoringApiClientService, fb: FormBuilder) {
    this.mySponsorFormControl = fb.control('', Validators.required);

    const currentAccount$ = this.store.pipe(
      select(selectCurrentAccount),
      filter(asyncItem => !asyncItem.status.pending),
      map(asyncItem => asyncItem.data)
    );

    this.sponsorId$ = currentAccount$.pipe(
      map(currentAccount => getModule(currentAccount, 'sponsoring')?.sponsorId)
    );

    this.sponsor$ = this.store.pipe(
      select(selectSponsoringProfiles),
      filter(asyncItem => !asyncItem.status.pending),
      map(asyncItem => asyncItem.data),
      map(sponsoringProfiles => sponsoringProfiles.sponsor),
      filter(sponsorProfile => !!sponsorProfile),
      map(sponsorProfile => {
        if (!sponsorProfile) {
          return undefined;
        }

        let description = undefined;
        if (sponsorProfile.firstname || sponsorProfile.lastname) {
          const parts = [];
          if (sponsorProfile.firstname) {
            parts.push(sponsorProfile.firstname);
          }
          if (sponsorProfile.lastname) {
            parts.push(sponsorProfile.lastname);
          }
          description = parts.join(' ');
        } else if(sponsorProfile.username) {
          description = sponsorProfile.username;
        }
        return description;
      })
    );
  }

  public chooseSponsor() {
    this.mySponsorFormControl.updateValueAndValidity();

    if (this.mySponsorFormControl.valid) {
      const sponsorCode = this.mySponsorFormControl.value;

      this.store.dispatch(setSetSponsorCall({
        call: this.sponsoringApiClientService.setSponsor(sponsorCode)
      }));

      this.store.pipe(
        select(selectSetSponsor),
        filter(asyncItem => !asyncItem.status.pending),
        take(1)
      ).subscribe(asyncItem => {
        if (asyncItem.error) {
          this.mySponsorFormControl.setErrors({'serverError': true});
        }
      });
    }
  }
}
