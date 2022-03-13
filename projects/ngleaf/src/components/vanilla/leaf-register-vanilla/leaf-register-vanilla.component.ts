import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { StoreRootModule } from '@ngrx/store';

import { LeafSessionService } from '../../../services/index';

export type LeafRegisterVanillaError = {
  login: ValidationErrors,
  password: ValidationErrors
};

export type LeafRegisterPasswordCheckClasses = {
  show: string[],
  hide: string[]
};

@Component({
  selector: 'leaf-register-vanilla',
  templateUrl: './leaf-register-vanilla.component.html',
  styleUrls: ['./leaf-register-vanilla.component.scss']
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

  public registerForm: FormGroup;

  public showPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private leafSessionService: LeafSessionService
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

  register() {
    if (this.registerForm.valid) {
      const {
        login,
        password,
        passwordValidation,
      } = this.registerForm.getRawValue();
      if (password === passwordValidation) {
        this.leafSessionService.register(login, password);
      }
    } else {
      this.onError.emit({
        login: this.registerForm.controls.login.errors,
        password: this.registerForm.controls.password.errors
      });
    }
  }
}
