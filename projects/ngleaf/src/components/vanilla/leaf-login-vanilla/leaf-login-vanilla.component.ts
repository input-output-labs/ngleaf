import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { LeafSessionService } from '../../../services/index';

export type LeafLoginVanillaError = {
  login: ValidationErrors,
  password: ValidationErrors
};

@Component({
  selector: 'leaf-login-vanilla',
  templateUrl: './leaf-login-vanilla.component.html',
  styleUrls: ['./leaf-login-vanilla.component.scss'],
})
export class LeafLoginVanillaComponent implements OnInit {
  @Input()
  public loginValidators: ValidatorFn[] = [Validators.required];
  @Input()
  public passwordValidators: ValidatorFn[] = [Validators.required];

  @Output()
  public onError: EventEmitter<LeafLoginVanillaError> = new EventEmitter<LeafLoginVanillaError>();

  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private sessionService: LeafSessionService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: ['', this.loginValidators],
      password: ['', this.passwordValidators],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { login, password } = this.loginForm.getRawValue();
      this.sessionService.login(login, password);
    } else {
      this.onError.emit({
        login: this.loginForm.controls.login.errors,
        password: this.loginForm.controls.password.errors,
      });
    }
  }
}
