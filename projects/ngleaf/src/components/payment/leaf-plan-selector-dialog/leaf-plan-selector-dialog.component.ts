import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-leaf-plan-selector-dialog',
  templateUrl: './leaf-plan-selector-dialog.component.html',
  styleUrls: ['./leaf-plan-selector-dialog.component.scss']
})
export class LeafPlanSelectorDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LeafPlanSelectorDialogComponent>) { }

  ngOnInit() {
  }

  public onPaymentSelected() {
    this.dialogRef.close();
  }
}
