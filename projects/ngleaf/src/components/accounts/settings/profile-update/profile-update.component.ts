import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { Observable, filter, map, Subscription } from "rxjs";
import { LeafAccountProfile } from "../../../../api/models/leaf-account.model";
import { selectCurrentAccountData, updateProfile } from "../../../../store/core/session/index";
import { MatFormFieldAppearance } from "@angular/material/form-field";

export type ProfileUpdateFields = keyof LeafAccountProfile;

@Component({
  selector: "leaf-profile-update",
  templateUrl: "./profile-update.component.html",
  styleUrls: ["./profile-update.component.scss"],
})
export class ProfileUpdateComponent implements OnChanges, OnDestroy {
  @Input()
  public fields: ProfileUpdateFields[] = ['username', 'avatarUrl', 'firstname', 'lastname', 'phoneNumber', 'address'];

  @Input()
  public mandatoryFields?: ProfileUpdateFields[] = ['username', 'avatarUrl', 'firstname', 'lastname', 'phoneNumber', 'address'];

  @Input()
  public submitTrigger$?: Observable<void>;

  @Input()
  public separateColumnForAvatar: boolean = true;

  @Input()
  public fieldAppearance: MatFormFieldAppearance = "fill";

  @Input()
  public hideGroupTitles: boolean = false;

  public currentProfile$: Observable<LeafAccountProfile>;

  public profileFormGroup: UntypedFormGroup;

  private subscriptions: Subscription[] = [];

  constructor(public formBuilder: UntypedFormBuilder, public store: Store) {
    this.currentProfile$ = this.store.pipe(
      select(selectCurrentAccountData),
      filter((account) => !!account),
      map((account) => account.profile)
    );
    this.profileFormGroup = this.formBuilder.group(
      this.fields.reduce(
        (config, field) => ({
          ...config,
          [field]: ["", Validators.required],
        }),
        {}
      )
    );

    this.subscriptions.push(
      this.currentProfile$.subscribe(
        (profile) => {
          this.fields.forEach((field) => {
            this.profileFormGroup.controls[field].setValue(profile[field]);
          });
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.mandatoryFields) {
      Object.values(this.profileFormGroup.controls).forEach((control) => {
        control.removeValidators(Validators.required);
        control.setErrors(null);
      });
      (this.mandatoryFields || []).forEach(field => this.profileFormGroup.controls[field].addValidators(Validators.required));
    }
    if (changes.submitTrigger$ && this.submitTrigger$) {
      this.subscriptions.push(
        this.submitTrigger$.subscribe(() => {
          this.profileFormGroup.updateValueAndValidity();
          if (this.profileFormGroup.valid) {
            this.store.dispatch(updateProfile({updates: this.profileFormGroup.getRawValue()}));
          }
        })
      );
    }
  }

  public submit() {
    this.profileFormGroup.updateValueAndValidity();
    if (this.profileFormGroup.valid) {
      this.store.dispatch(updateProfile({updates: this.profileFormGroup.getRawValue()}));
    }
  }
}
