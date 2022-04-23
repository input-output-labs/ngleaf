import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { emitNotification} from '../../../store/index';

import { LeafSessionService } from '../../../services/index';
import { Store } from '@ngrx/store';

export type LeafLoginVanillaError = {
  login: ValidationErrors,
  password: ValidationErrors
};

export type LeafLoginPasswordCheckClasses = {
  show: string[],
  hide: string[]
};

@Component({
  selector: 'leaf-login-vanilla',
  templateUrl: './leaf-login-vanilla.component.html',
  styleUrls: ['./leaf-login-vanilla.component.scss'],
})
export class LeafLoginVanillaComponent implements OnInit {
  @Input()
  public enablePasswordCheck: boolean = false;
  @Input()
  public passwordCheckClasses?: LeafLoginPasswordCheckClasses;
  @Input()
  public loginValidators: ValidatorFn[] = [Validators.required];
  @Input()
  public passwordValidators: ValidatorFn[] = [Validators.required];

  @Output()
  public onError: EventEmitter<LeafLoginVanillaError> = new EventEmitter<LeafLoginVanillaError>();

  public loginForm: FormGroup;

  public showPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private sessionService: LeafSessionService,
    private store: Store
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
      this.store.dispatch(emitNotification(null));
      this.sessionService.login(login, password);
    } else {
      this.onError.emit({
        login: this.loginForm.controls.login.errors,
        password: this.loginForm.controls.password.errors,
      });
    }
  }
}
