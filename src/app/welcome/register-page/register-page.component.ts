import { Component } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-login-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

  public loginValidators: ValidatorFn[] = [Validators.required, Validators.email];

  constructor() { }

}
