import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AccountApiClient } from '../../../api/clients';

interface AccountFlagsDialogData {
  accountId: string;
  email: string;
  flags?: string[];
}

@Component({
  selector: 'leaf-account-flags-dialog',
  templateUrl: './leaf-account-flags-dialog.component.html',
  styleUrls: ['./leaf-account-flags-dialog.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ]
})
export class LeafAccountFlagsDialogComponent {
  public newFlag = '';
  public flags: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AccountFlagsDialogData,
    private accountApiClient: AccountApiClient,
    public dialogRef: MatDialogRef<LeafAccountFlagsDialogComponent>
  ) {
    this.flags = [...(data.flags || [])];
  }

  public addFlag() {
    const normalizedValue = this.newFlag.trim().toLowerCase();
    if (!normalizedValue || this.flags.includes(normalizedValue)) {
      this.newFlag = '';
      return;
    }
    this.flags.push(normalizedValue);
    this.newFlag = '';
  }

  public removeFlag(flag: string) {
    this.flags = this.flags.filter(existingFlag => existingFlag !== flag);
  }

  public save() {
    this.accountApiClient.updateFlags(this.data.accountId, this.flags).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
