import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  standalone: false,
  selector: 'leaf-account-settings-password',
  templateUrl: './account-settings-password.component.html',
  styleUrls: ['./account-settings-password.component.scss'],
})
export class AccountSettingsPasswordComponent implements OnInit {

  public members: string[] = [];

  constructor(public dialogRef: MatDialogRef<AccountSettingsPasswordComponent>) {}

  ngOnInit() {}

  public onPasswordChanged() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
