import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";

import { LeafSessionService } from "../../../../services/index";

export type LeafLoginError = {
  login: ValidationErrors;
  password: ValidationErrors;
};

export type LeafLoginPasswordCheckClasses = {
  show: string[];
  hide: string[];
};

@Component({
  selector: "leaf-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LeafLoginComponent implements OnInit {
  @Input()
  public enablePasswordCheck: boolean = false;
  @Input()
  public passwordCheckClasses?: LeafLoginPasswordCheckClasses;
  @Input()
  public loginValidators: ValidatorFn[] = [Validators.required];
  @Input()
  public passwordValidators: ValidatorFn[] = [Validators.required];
  @Input()
  public variant: "vanilla" | "material" = "material";
  @Input()
  public color = "primary";
  @Input()
  public loginInitialValue: "";
  @Input()
  public skipRedirect: boolean = false;

  @Output()
  public onError: EventEmitter<LeafLoginError> = new EventEmitter<LeafLoginError>();

  @Output()
  public onSuccess: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public onFailure: EventEmitter<void> = new EventEmitter<void>();

  public loginForm: UntypedFormGroup;

  public showPassword: boolean = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private sessionService: LeafSessionService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: [this.loginInitialValue, this.loginValidators],
      password: ["", this.passwordValidators],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { login, password } = this.loginForm.getRawValue();
      this.sessionService.login(login, password, {
        onSuccess: () => this.onSuccess.emit(),
        onFailure: () => this.onFailure.emit(),
        skipRedirect: this.skipRedirect
      });
    } else {
      this.onError.emit({
        login: this.loginForm.controls.login.errors,
        password: this.loginForm.controls.password.errors,
      });
    }
  }
}
