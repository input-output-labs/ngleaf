import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { LeafSessionService } from '../../../../services/index';

@Component({
  selector: 'leaf-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private sessionService: LeafSessionService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.getRawValue();
      this.sessionService.login(email, password);
    }
  }
}
