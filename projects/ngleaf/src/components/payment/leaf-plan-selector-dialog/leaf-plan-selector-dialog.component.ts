import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PlanViewerConfig } from '../leaf-plan-viewer';

@Component({
  standalone: false,
  selector: 'app-leaf-plan-selector-dialog',
  templateUrl: './leaf-plan-selector-dialog.component.html',
  styleUrls: ['./leaf-plan-selector-dialog.component.scss']
})
export class LeafPlanSelectorDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LeafPlanSelectorDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: PlanViewerConfig) { }

  ngOnInit() {
  }

  public onPaymentSelected() {
    this.dialogRef.close();
  }
}
