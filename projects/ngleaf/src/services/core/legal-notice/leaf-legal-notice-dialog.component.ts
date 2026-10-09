import { CommonModule } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { AccountApiClient } from '../../../api/clients';
import { setCurrentAccountSuccess } from '../../../store/core/session';

export interface LeafLegalNoticeDialogData {
  legalNoticeLink?: string;
  illustrationUrl?: string;
}

@Component({
  standalone: true,
  selector: 'leaf-legal-notice-dialog',
  templateUrl: './leaf-legal-notice-dialog.component.html',
  styleUrls: ['./leaf-legal-notice-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, TranslateModule, MatDialogModule, MatButtonModule, MatIconModule],
})
export class LeafLegalNoticeDialogComponent {
  public accepting = false;
  public acceptError = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: LeafLegalNoticeDialogData,
    private dialogRef: MatDialogRef<LeafLegalNoticeDialogComponent, boolean>,
    private accountApiClient: AccountApiClient,
    private store: Store,
  ) {}

  public dismiss(): void {
    if (this.accepting) {
      return;
    }
    this.dialogRef.close(false);
  }

  public accept(): void {
    if (this.accepting) {
      return;
    }
    this.accepting = true;
    this.acceptError = false;
    this.dialogRef.disableClose = true;
    this.accountApiClient.acceptLegalNotice().subscribe({
      next: (account) => {
        this.store.dispatch(setCurrentAccountSuccess({ data: account }));
        this.dialogRef.close(true);
      },
      error: () => {
        this.accepting = false;
        this.acceptError = true;
        this.dialogRef.disableClose = false;
      },
    });
  }
}
