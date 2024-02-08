import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable, filter, map, Subscription, combineLatest, Subject, take } from "rxjs";
import { LeafAccountProfile } from "../../../../api/models/leaf-account.model";
import { selectCurrentAccountData, selectCurrentOrganization, selectCurrentOrganizationId, updateOrganizationProfile, updateProfile } from "../../../../store/index";
import { MatFormFieldAppearance } from "@angular/material/form-field";

export type ProfileUpdateFields = keyof LeafAccountProfile;

@Component({
  selector: "leaf-profile-update",
  templateUrl: "./profile-update.component.html",
  styleUrls: ["./profile-update.component.scss"],
})
export class ProfileUpdateComponent implements OnChanges, OnDestroy {
  @Input()
  public fields: ProfileUpdateFields[] = ['username', 'avatarUrl', 'firstname', 'lastname', 'phoneNumber', 'address', 'corporate', 'taxId'];

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

  @Input()
  public target: "account" | "organization" = "account";

  public currentProfile$: Observable<LeafAccountProfile>;

  public target$: Subject<"account" | "organization"> = new Subject();

  public profileFormGroup: UntypedFormGroup;

  private subscriptions: Subscription[] = [];

  constructor(public formBuilder: UntypedFormBuilder, public store: Store) {
    const target$ = combineLatest([
      this.target$,
      this.store.select(selectCurrentAccountData),
      this.store.select(selectCurrentOrganization)
    ]).pipe(
      map(([target, account, organization]) => target === "account" ? account : organization)
    );
    this.currentProfile$ = target$.pipe(
      filter((target) => !!target),
      map((target) => target.profile)
    );
    this.profileFormGroup = this.formBuilder.group(
      this.fields.reduce(
        (config, field) => ({
          ...config,
          [field]: ["", this.mandatoryFields.includes(field) ? Validators.required : null],
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
    if (changes.target) {
      this.target$.next(this.target);
    }
  }

  public submit() {
    this.profileFormGroup.updateValueAndValidity();
    if (this.profileFormGroup.valid) {
      switch(this.target) {
        case "account":
          this.store.dispatch(updateProfile({updates: this.profileFormGroup.getRawValue()}));
          break;
        case "organization":
          this.store.select(selectCurrentOrganizationId).pipe(take(1)).subscribe((organizationId) => {
            this.store.dispatch(updateOrganizationProfile({organizationId, profile: this.profileFormGroup.getRawValue()}));
          });
          break;
      }
    }
  }
}
