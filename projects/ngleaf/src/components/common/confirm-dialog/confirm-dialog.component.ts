import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  standalone: false,
  selector: 'leaf-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class LeafConfirmDialogComponent implements OnInit {
  title: string;
  message: string;
  confirmButtonLabel: string = 'leaf.confirm-dialog.yes';
  dismissButtonLabel: string = 'leaf.confirm-dialog.no';

  constructor(public dialogRef: MatDialogRef<LeafConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
    if (data.confirmButtonLabel) this.confirmButtonLabel = data.confirmButtonLabel;
    if (data.dismissButtonLabel) this.dismissButtonLabel = data.dismissButtonLabel;
  }

  ngOnInit() {
  }

  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}

/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
export class ConfirmDialogModel {

  constructor(public title: string, public message: string, public confirmButtonLabel?: string, public dismissButtonLabel?: string) {
  }
}
