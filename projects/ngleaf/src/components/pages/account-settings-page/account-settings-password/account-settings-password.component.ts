import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LeafSessionService } from '../../../../services/index';

@Component({
  selector: 'leaf-account-settings-password',
  templateUrl: './account-settings-password.component.html',
  styleUrls: ['./account-settings-password.component.scss'],
})
export class AccountSettingsPasswordComponent implements OnInit {

  public members: string[] = [];

  constructor() {}

  ngOnInit() {}
}
