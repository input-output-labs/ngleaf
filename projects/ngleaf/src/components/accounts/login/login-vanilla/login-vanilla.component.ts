import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { emitNotification} from '../../../../store/index';
import { LeafSessionService } from '../../../../services/index';

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
  templateUrl: './login-vanilla.component.html',
  styleUrls: ['./login-vanilla.component.scss'],
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

  public loginForm: UntypedFormGroup;

  public showPassword: boolean = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
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
