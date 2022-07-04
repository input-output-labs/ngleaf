import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { LeafSessionService } from '../../../../services/index';

@Component({
  selector: 'leaf-account-settings-avatar',
  templateUrl: './account-settings-avatar.component.html',
  styleUrls: ['./account-settings-avatar.component.scss'],
})
export class AccountSettingsAvatarComponent implements OnInit {
  public changeAvatarForm: UntypedFormGroup;

  constructor(
    public formBuilder: UntypedFormBuilder,
    public sessionService: LeafSessionService
  ) {
    this.changeAvatarForm = this.formBuilder.group({
      avatarUrl: ['', Validators.required],
    });
  }

  ngOnInit() {}

  changeAvatar() {
    if (this.changeAvatarForm.valid) {
      const { avatarUrl } = this.changeAvatarForm.getRawValue();
      this.sessionService.changeAvatar(avatarUrl);
    }
  }
}
