import { Component, OnInit } from '@angular/core';

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
