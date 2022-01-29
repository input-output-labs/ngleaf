import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter, map, take } from 'rxjs';

import { LeafSessionService } from '../../../services/index';

export type LeafPasswordForgottenVanillaState = 'SendPassword' | 'PasswordChange';

export type LeafPasswordForgottenVanilla_SendPasswordChangeError = {
  email: ValidationErrors
};

export type LeafPasswordForgottenVanilla_PasswordChangeError = {
  passwordChangeKey: ValidationErrors,
  password: ValidationErrors
};

export type LeafPasswordForgottenVanillaError = {
  state: LeafPasswordForgottenVanillaState
} & (LeafPasswordForgottenVanilla_SendPasswordChangeError | LeafPasswordForgottenVanilla_PasswordChangeError);

@Component({
  selector: 'leaf-password-forgotten-vanilla',
  templateUrl: './leaf-password-forgotten-vanilla.component.html',
  styleUrls: ['./leaf-password-forgotten-vanilla.component.scss']
})
export class LeafPasswordForgottenVanillaComponent implements OnInit {
  @Input()
  public emailValidators: ValidatorFn[] = [Validators.required];
  @Input()
  public passwordChangeKeyValidators: ValidatorFn[] = [Validators.required];
  @Input()
  public passwordValidators: ValidatorFn[] = [Validators.required];

  @Output()
  public onError: EventEmitter<LeafPasswordForgottenVanillaError> = new EventEmitter<LeafPasswordForgottenVanillaError>();
  @Output()
  public onDone: EventEmitter<void> = new EventEmitter<void>();

  public state: LeafPasswordForgottenVanillaState = 'SendPassword';
  public sendPasswordChangeForm: FormGroup;
  public passwordChangeForm: FormGroup;
  public emailToResendTo?: string;

  constructor(
    private formBuilder: FormBuilder,
    private leafSessionService: LeafSessionService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.sendPasswordChangeForm = this.formBuilder.group({
      email: ['', this.emailValidators],
    });
    this.passwordChangeForm = this.formBuilder.group({
      passwordChangeKey: ['', this.passwordChangeKeyValidators],
      password: ['', this.passwordValidators],
      passwordValidation: ['', this.passwordValidators],
    });
    this.route.queryParams
      .pipe(
        take(1),
        map(params => params.passwordChangeKey),
        filter(passwordChangeKey => !!passwordChangeKey)
      )
      .subscribe(passwordChangeKey => {
        this.state = 'PasswordChange';
        this.passwordChangeForm.controls.passwordChangeKey.setValue(passwordChangeKey);
      }
    );
  }

  public sendPasswordChangeKey() {
    if (this.sendPasswordChangeForm.valid) {
      this.emailToResendTo = this.sendPasswordChangeForm.getRawValue().email;
      this.sendEmail();
    } else {
      this.onError.emit({
        state: this.state,
        email: this.sendPasswordChangeForm.controls.email.errors
      });
    }
  }

  public changePassword() {
    if (this.passwordChangeForm.valid) {
      const {
        passwordChangeKey,
        password,
        passwordValidation,
      } = this.passwordChangeForm.getRawValue();
      if (password === passwordValidation) {
        this.leafSessionService.resetPassword(passwordChangeKey, password).then(
          () => this.onDone.emit()
        );
      }
    } else {
      this.onError.emit({
        state: this.state,
        passwordChangeKey: this.sendPasswordChangeForm.controls.passwordChangeKey.errors,
        password: this.sendPasswordChangeForm.controls.password.errors
      });
    }
  }

  public resendEmail(event) {
    event.preventDefault();
    this.sendPasswordChangeKey();
  }

  public sendEmail() {
    this.leafSessionService.sendResetPasswordKey(this.emailToResendTo).then(
      () => this.state = 'PasswordChange'
    );
  }
}
