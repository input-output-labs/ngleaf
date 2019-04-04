import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LeafSessionService} from '../../../../services/leaf-session.service';

@Component({
  selector: 'leaf-account-settings-password',
  templateUrl: './account-settings-password.component.html',
  styleUrls: ['./account-settings-password.component.scss']
})
export class AccountSettingsPasswordComponent implements OnInit {

  public changePasswordForm: FormGroup;

  public members: string[] = [];

  constructor(public formBuilder: FormBuilder,
              public sessionService: LeafSessionService) {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      newPasswordValidation: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  changePassword() {
    if (this.changePasswordForm.valid) {
      const {oldPassword, newPassword, newPasswordValidation} = this.changePasswordForm.getRawValue();
      if (newPassword === newPasswordValidation) {
        this.sessionService.changePassword(oldPassword, newPassword);
      }
    }
  }
}
