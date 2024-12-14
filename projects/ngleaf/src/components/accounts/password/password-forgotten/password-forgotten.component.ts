import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { filter, map, take } from "rxjs";

import { LeafSessionService } from "../../../../services/index";
import {
  AsyncType,
  selectSendResetPasswordKey,
  selectResetPassword,
} from "../../../../store/index";
import {
  LeafPasswordForgottenDone,
  LeafPasswordForgottenError,
  LeafPasswordForgottenState,
} from "../password-forgotten.models";

@Component({
  selector: "leaf-password-forgotten",
  templateUrl: "./password-forgotten.component.html",
  styleUrls: ["./password-forgotten.component.scss"],
})
export class LeafPasswordForgottenComponent implements OnInit {
  @Input()
  public emailValidators: ValidatorFn[] = [Validators.required];
  @Input()
  public passwordChangeKeyValidators: ValidatorFn[] = [Validators.required];
  @Input()
  public passwordValidators: ValidatorFn[] = [Validators.required];
  @Input()
  public color = "primary";
  @Input()
  public emailInitialValue = "";

  @Output()
  public onError: EventEmitter<LeafPasswordForgottenError> = new EventEmitter<LeafPasswordForgottenError>();
  @Output()
  public onDone: EventEmitter<LeafPasswordForgottenDone> = new EventEmitter<LeafPasswordForgottenDone>();

  public state: LeafPasswordForgottenState = "SendPassword";
  public sendPasswordChangeForm: UntypedFormGroup;
  public passwordChangeForm: UntypedFormGroup;
  public emailToResendTo?: string;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private leafSessionService: LeafSessionService,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    this.sendPasswordChangeForm = this.formBuilder.group({
      email: [this.emailInitialValue, this.emailValidators],
    });
    this.passwordChangeForm = this.formBuilder.group({
      passwordChangeKey: ["", this.passwordChangeKeyValidators],
      password: ["", this.passwordValidators],
      passwordValidation: ["", this.passwordValidators],
    });
    this.route.queryParams
      .pipe(
        take(1),
        map((params) => params.passwordChangeKey),
        filter((passwordChangeKey) => !!passwordChangeKey)
      )
      .subscribe((passwordChangeKey) => {
        this.state = "PasswordChange";
        this.passwordChangeForm.controls.passwordChangeKey.setValue(
          passwordChangeKey
        );
      });
  }

  public sendPasswordChangeKey() {
    if (this.sendPasswordChangeForm.valid) {
      this.emailToResendTo = this.sendPasswordChangeForm.getRawValue().email;
      this.sendEmail();
    } else {
      this.onError.emit({
        state: this.state,
        email: this.sendPasswordChangeForm.controls.email.errors,
      });
    }
  }

  public changePassword() {
    if (this.passwordChangeForm.valid) {
      const { passwordChangeKey, password, passwordValidation } =
        this.passwordChangeForm.getRawValue();
      if (password === passwordValidation) {
        this.leafSessionService.resetPassword(passwordChangeKey, password);

        this.store
          .pipe(
            select(selectResetPassword),
            filter<AsyncType<void>>(
              (resetPassword) => !resetPassword.status.pending
            ),
            map((resetPassword) => resetPassword.status.success),
            take(1)
          )
          .subscribe((success) => {
            if (success) {
              this.onDone.emit({
                state: this.state,
              });
            } else {
              this.onError.emit({
                state: this.state,
                submission: true,
              });
            }
          });
      }
    } else {
      this.onError.emit({
        state: this.state,
        passwordChangeKey:
          this.passwordChangeForm.controls.passwordChangeKey?.errors,
        password: this.passwordChangeForm.controls.password?.errors,
      });
    }
  }

  public resendEmail(event) {
    event.preventDefault();
    this.sendPasswordChangeKey();
  }

  public sendEmail() {
    this.leafSessionService.sendResetPasswordKey(this.emailToResendTo);

    this.store
      .pipe(
        select(selectSendResetPasswordKey),
        filter<AsyncType<void>>(
          (sendResetPasswordKey) => !sendResetPasswordKey.status.pending
        ),
        map((sendResetPasswordKey) => sendResetPasswordKey.status.success),
        take(1)
      )
      .subscribe((success) => {
        if (success) {
          this.onDone.emit({
            state: this.state,
          });
          this.state = "PasswordChange";
        } else {
          this.onError.emit({
            state: this.state,
            submission: true,
          });
        }
      });
  }
}
