import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { LeafSessionService } from '../../../../services/index';
import { LeafPasswordSecurityLevel, LeafPasswordSecurityService } from '../../../common/password-security';

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
export class PasswordUpdateComponent implements OnInit {
  public changePasswordForm: UntypedFormGroup;

  @Input()
  public showPasswordSecurityLevel: boolean = true;
  @Input()
  public minimumPasswordSecurity: LeafPasswordSecurityLevel | null = "medium";

  @Output()
  public onSuccess: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public onFailure: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    public formBuilder: UntypedFormBuilder,
    public sessionService: LeafSessionService,
    private passwordSecurityService: LeafPasswordSecurityService
  ) {}

  ngOnInit() {
    // Build password validators array
    const passwordValidatorsArray = [Validators.required];
    
    // Add minimum security level validator if specified
    if (this.minimumPasswordSecurity) {
      passwordValidatorsArray.push(this.passwordSecurityService.createPasswordSecurityValidator(this.minimumPasswordSecurity));
    }

    this.changePasswordForm = this.formBuilder.group(
      {
        oldPassword: ['', Validators.required],
        newPassword: ['', passwordValidatorsArray],
        newPasswordValidation: ['', passwordValidatorsArray],
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

  hasMinimumPasswordSecurityError(): boolean {
    const passwordControl = this.changePasswordForm.get('newPassword');
    return !!(
      passwordControl &&
      passwordControl.getError('minimumPasswordSecurity') &&
      passwordControl.dirty &&
      passwordControl.touched
    );
  }

  getMinimumPasswordSecurityErrorMessage(): string {
    const passwordControl = this.changePasswordForm.get('newPassword');
    const error = passwordControl?.getError('minimumPasswordSecurity');
    if (!error) {
      return '';
    }

    const password = passwordControl?.value || '';
    return this.passwordSecurityService.getMinimumPasswordSecurityErrorMessage(
      password,
      error.required,
      error.actual
    );
  }
}
