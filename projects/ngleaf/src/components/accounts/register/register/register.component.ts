import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { LeafSessionService } from '../../../../services/index';

export type LeafRegisterError = {
  login: ValidationErrors,
  password: ValidationErrors,
  passwordValidation: ValidationErrors
};

export type LeafRegisterPasswordCheckClasses = {
  show: string[],
  hide: string[]
};

@Component({
  selector: 'leaf-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class LeafRegisterComponent implements OnInit {
  @Input()
  public enablePasswordCheck: boolean = false;
  @Input()
  public passwordCheckClasses?: LeafRegisterPasswordCheckClasses;
  @Input()
  public loginValidators: ValidatorFn[] = [Validators.required];
  @Input()
  public passwordValidators: ValidatorFn[] = [Validators.required];
  @Input()
  public variant: "vanilla" | "material" = "material";

  @Output()
  public onError: EventEmitter<LeafRegisterError> = new EventEmitter<LeafRegisterError>();

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
