import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { emitNotification } from '../../../../store/index';
import { LeafSessionService } from '../../../../services/index';

export type LeafRegisterVanillaError = {
  login: ValidationErrors,
  password: ValidationErrors,
  passwordValidation: ValidationErrors
};

export type LeafRegisterPasswordCheckClasses = {
  show: string[],
  hide: string[]
};

@Component({
  selector: 'leaf-register-vanilla',
  templateUrl: './register-vanilla.component.html',
  styleUrls: ['./register-vanilla.component.scss']
})
export class LeafRegisterVanillaComponent implements OnInit {
  @Input()
  public enablePasswordCheck: boolean = false;
  @Input()
  public passwordCheckClasses?: LeafRegisterPasswordCheckClasses;
  @Input()
  public loginValidators: ValidatorFn[] = [Validators.required];
  @Input()
  public passwordValidators: ValidatorFn[] = [Validators.required];

  @Output()
  public onError: EventEmitter<LeafRegisterVanillaError> = new EventEmitter<LeafRegisterVanillaError>();

  public registerForm: UntypedFormGroup;

  public showPassword: boolean = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private leafSessionService: LeafSessionService,
    private store: Store
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      login: ['', this.loginValidators],
      password: ['', this.passwordValidators],
      passwordValidation: ['', this.passwordValidators],
    });
  }

  registerHasError(inputName: string): boolean {
    const inputToControl = this.registerForm.get(inputName);
    return (
      inputToControl &&
      inputToControl.getError('required') &&
      (inputToControl.dirty && inputToControl.touched)
    );
  }

  register(event) {
    event.stopPropagation();
    event.preventDefault();
    if (this.registerForm.valid) {
      const {
        login,
        password,
        passwordValidation,
      } = this.registerForm.getRawValue();
      if (password === passwordValidation) {
        this.store.dispatch(emitNotification(null));
        this.leafSessionService.register(login, password);
      } else {
        this.onError.emit({
          login: this.registerForm.controls.login.errors,
          password: {
            ...this.registerForm.controls.password.errors,
            identical: true
          },
          passwordValidation: this.registerForm.controls.passwordValidation.errors
        });
      }
    } else {
      this.onError.emit({
        login: this.registerForm.controls.login.errors,
        password: this.registerForm.controls.password.errors,
        passwordValidation: this.registerForm.controls.passwordValidation.errors
      });
    }
  }
}
