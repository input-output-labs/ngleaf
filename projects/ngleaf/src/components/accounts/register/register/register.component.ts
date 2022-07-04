import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { LeafSessionService } from '../../../../services/index';

@Component({
  selector: 'leaf-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registerForm: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private leafSessionService: LeafSessionService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordValidation: ['', Validators.required],
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
        email,
        password,
        passwordValidation,
      } = this.registerForm.getRawValue();
      if (password === passwordValidation) {
        this.leafSessionService.register(email, password);
      }
    }
  }
}
