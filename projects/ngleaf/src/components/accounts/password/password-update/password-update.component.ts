import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';

import { LeafSessionService } from '../../../../services/index';

@Component({
  selector: 'leaf-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.scss']
})
export class PasswordUpdateComponent {
  public changePasswordForm: UntypedFormGroup;

  constructor(
    public formBuilder: UntypedFormBuilder,
    public sessionService: LeafSessionService
  ) {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      newPasswordValidation: ['', Validators.required],
    });
    this.changePasswordForm.controls.newPassword.valueChanges.pipe(distinctUntilChanged()).subscribe(
      () => {
        this.changePasswordForm.controls.newPassword.setErrors({'different': undefined});
        this.changePasswordForm.controls.newPassword.updateValueAndValidity();
      }
    );
    this.changePasswordForm.controls.newPasswordValidation.valueChanges.pipe(distinctUntilChanged()).subscribe(
      () => {
        this.changePasswordForm.controls.newPasswordValidation.setErrors({'different': undefined});
        this.changePasswordForm.controls.newPasswordValidation.updateValueAndValidity();
      }
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
        this.sessionService.changePassword(oldPassword, newPassword);
      } else {
        this.changePasswordForm.controls.newPassword.setErrors({'different': true});
        this.changePasswordForm.controls.newPasswordValidation.setErrors({'different': true});
      }
    }
  }
}
