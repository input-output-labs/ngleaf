import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, take } from 'rxjs';

import { LeafNotificationService, LeafSessionService } from '../../../services/index';
import { setSessionLoading } from '../../../store/core/session/session.actions';

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
    private notificationService: LeafNotificationService,
    private route: ActivatedRoute,
    private store: Store) { }

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
        this.store.dispatch(setSessionLoading({isLoading: true}));
        this.leafSessionService.resetPassword(passwordChangeKey, password).then(
          () => { 
            this.onDone.emit();
            this.store.dispatch(setSessionLoading({isLoading: false}));
            this.notificationService.emit({
              id: 'changePasswordSuccess',
              category: 'session',
              message: 'Password changed successfully.'
            });
          }
        ).catch(() => {
          this.store.dispatch(setSessionLoading({isLoading: false}));
          this.notificationService.emit({
            id: 'changePasswordFailed',
            category: 'session',
            message: 'An error occurred while trying to change the password.'
          });
        });
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
    this.store.dispatch(setSessionLoading({isLoading: true}));
    this.leafSessionService.sendResetPasswordKey(this.emailToResendTo).then(
      () => { 
        this.state = 'PasswordChange';
        this.store.dispatch(setSessionLoading({isLoading: false})); 
      }
    ).catch(() => {
      this.notificationService.emit({
        id: 'sendResetPasswordFailed',
        category: 'session',
        message: 'An error occurred while trying to reset the password. No change key sent.'
      });
      this.store.dispatch(setSessionLoading({isLoading: false}));
    });
  }
}
