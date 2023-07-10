import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { LeafAccountModel } from "../../../../api";

export interface SponsoringCodeUpdateDialogData {
  account: LeafAccountModel;
}

@Component({
  selector: "app-sponsoring-code-update-dialog",
  templateUrl: "./sponsoring-code-update-dialog.component.html",
  styleUrls: ["./sponsoring-code-update-dialog.component.scss"],
})
export class SponsoringCodeUpdateDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SponsoringCodeUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SponsoringCodeUpdateDialogData
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onChanged(): void {
    this.dialogRef.close(true);
  }
}
