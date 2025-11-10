import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { LeafSessionService } from '../../../../services/index';

function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('newPassword');
    const passwordValidation = control.get('newPasswordValidation');

    if (password && passwordValidation && password.value !== passwordValidation.value) {
      return { passwordsMismatch: true };
    }
    return null;
  };
}

@Component({
  standalone: false,
  selector: 'leaf-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.scss']
})
export class PasswordUpdateComponent {
  public changePasswordForm: UntypedFormGroup;

  @Output()
  public onSuccess: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public onFailure: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    public formBuilder: UntypedFormBuilder,
    public sessionService: LeafSessionService
  ) {
    this.changePasswordForm = this.formBuilder.group(
      {
        oldPassword: ['', Validators.required],
        newPassword: ['', Validators.required],
        newPasswordValidation: ['', Validators.required],
      },
      { validators: passwordMatchValidator() }
    );
  }

  public changePassword() {
    if (this.changePasswordForm.valid) {
      const {
        oldPassword,
        newPassword,
        newPasswordValidation,
      } = this.changePasswordForm.getRawValue();
      if (newPassword === newPasswordValidation) {
        this.sessionService.changePassword(
          oldPassword,
          newPassword,
          {
            onSuccess: () => this.onSuccess.emit(),
            onFailure: () => this.onFailure.emit(),
          }
        );
      }
    }
  }
}
