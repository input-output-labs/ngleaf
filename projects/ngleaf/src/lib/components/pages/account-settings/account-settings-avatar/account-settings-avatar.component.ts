import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { HttpEventType, HttpResponse } from '@angular/common/http';
import { LeafSessionService } from '../../../../services/LeafSession.service';

@Component({
  selector: 'leaf-account-settings-avatar',
  templateUrl: './account-settings-avatar.component.html',
  styleUrls: ['./account-settings-avatar.component.scss']
})
export class AccountSettingsAvatarComponent implements OnInit {

  public changeAvatarForm: FormGroup;

  constructor(public formBuilder: FormBuilder,
    public sessionService: LeafSessionService) {
    this.changeAvatarForm = this.formBuilder.group({
      avatarUrl: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  selectFile(avatarUrl:string) {
    this.changeAvatarForm.controls.avatarUrl.setValue(avatarUrl);
  }

  changeAvatar() {
    if (this.changeAvatarForm.valid) {
      const {avatarUrl} = this.changeAvatarForm.getRawValue();
      this.sessionService.changeAvatar(avatarUrl);
    }
  }
}
