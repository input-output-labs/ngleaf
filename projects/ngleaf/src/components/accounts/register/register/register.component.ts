import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

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
  selector: "leaf-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
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
  @Input()
  public loginInitialValue: "";
  @Input()
  public passwordConfirmation = true;
  @Input()
  public skipRedirect: boolean = false;

  @Output()
  public onError: EventEmitter<LeafRegisterError> = new EventEmitter<LeafRegisterError>();

  @Output()
  public onSuccess: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public onFailure: EventEmitter<void> = new EventEmitter<void>();

  public registerForm: UntypedFormGroup;

  public showPassword: boolean = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private leafSessionService: LeafSessionService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      login: [this.loginInitialValue, this.loginValidators],
      password: ["", this.passwordValidators],
      passwordValidation: [
        "",
        this.passwordConfirmation ? this.passwordValidators : [],
      ],
    });
  }

  registerHasError(inputName: string): boolean {
    const inputToControl = this.registerForm.get(inputName);
    return (
      inputToControl &&
      inputToControl.getError("required") &&
      inputToControl.dirty &&
      inputToControl.touched
    );
  }

  register(event) {
    event.stopPropagation();
    event.preventDefault();
    if (this.registerForm.valid) {
      const { login, password, passwordValidation } =
        this.registerForm.getRawValue();
      if (
        password === passwordValidation ||
        this.passwordConfirmation === false
      ) {
        this.leafSessionService.register(login, password, {
          onSuccess: () => this.onSuccess.emit(),
          onFailure: () => this.onFailure.emit(),
          skipRedirect: this.skipRedirect,
        });
      } else {
        this.onError.emit({
          login: this.registerForm.controls.login.errors,
          password: {
            ...this.registerForm.controls.password.errors,
            identical: true,
          },
          passwordValidation:
            this.registerForm.controls.passwordValidation.errors,
        });
      }
    } else {
      this.onError.emit({
        login: this.registerForm.controls.login.errors,
        password: this.registerForm.controls.password.errors,
        passwordValidation:
          this.registerForm.controls.passwordValidation.errors,
      });
    }
  }
}
