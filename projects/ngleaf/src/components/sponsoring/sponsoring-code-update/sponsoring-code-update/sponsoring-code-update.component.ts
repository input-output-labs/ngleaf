import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { getModule } from '../../../../helpers/index';
import { LeafAccountModel } from '../../../../api/models/leaf-account.model';
import { SponsoringApiClientService } from '../../../../api/clients/index';
import { setUpdateSponsorCodeCall, selectUpdateSponsorCode } from '../../../../store/sponsoring/index';
import { filter, take } from 'rxjs';

@Component({
  standalone: false,
  selector: 'leaf-sponsoring-code-update',
  templateUrl: './sponsoring-code-update.component.html',
  styleUrls: ['./sponsoring-code-update.component.scss']
})
export class SponsoringCodeUpdateComponent implements OnChanges {
  @Input()
  public account: LeafAccountModel;
  public sponsorCode: string;

  @Output()
  public onChanged: EventEmitter<void> = new EventEmitter<void>();

  public mySponsorCodeFormControl: FormControl;

  constructor(private store: Store, private sponsoringApiClientService: SponsoringApiClientService, fb: FormBuilder,) {
    this.mySponsorCodeFormControl = fb.control('', Validators.required);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.account && this.account) {
      const sponsoring = getModule(this.account, 'sponsoring');
      if (sponsoring) {
        this.sponsorCode = sponsoring.sponsorCode;
        if (this.sponsorCode) {
          this.mySponsorCodeFormControl.setValue(this.sponsorCode);
        }
      }
    }
  }

  public chooseSponsorCode() {
    this.mySponsorCodeFormControl.updateValueAndValidity();

    if (this.mySponsorCodeFormControl.valid) {
      const sponsorCode = this.mySponsorCodeFormControl.value;

      this.store.dispatch(setUpdateSponsorCodeCall({
        call: this.sponsoringApiClientService.updateSponsorCode(this.account.id, sponsorCode)
      }));

      this.store.pipe(
        select(selectUpdateSponsorCode),
        filter(asyncItem => !asyncItem.status.pending),
        take(1)
      ).subscribe(asyncItem => {
        if (asyncItem.error) {
          this.mySponsorCodeFormControl.setErrors({'serverError': true});
        } else {
          this.onChanged.emit();
        }
      });
    }

  }
}
