import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { LeafSessionService } from '../../../../services/index';

@Component({
  selector: 'leaf-account-settings-general',
  templateUrl: './account-settings-general.component.html',
  styleUrls: ['./account-settings-general.component.scss'],
})
export class AccountSettingsGeneralComponent implements OnInit {
  public changeNameForm: UntypedFormGroup;

  public members: string[] = [];

  constructor(
    public formBuilder: UntypedFormBuilder,
    public sessionService: LeafSessionService
  ) {
    this.changeNameForm = this.formBuilder.group({
      username: ['', Validators.required],
    });
  }

  ngOnInit() {}

  changeName() {
    if (this.changeNameForm.valid) {
      const { username } = this.changeNameForm.getRawValue();
      this.sessionService.changeUsername(username);
    }
  }
}
