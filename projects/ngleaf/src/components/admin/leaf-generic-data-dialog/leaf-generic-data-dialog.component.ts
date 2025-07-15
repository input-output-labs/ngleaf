import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AccountApiClient, OrganizationsApiClientService } from '../../../api/clients/index';

@Component({
  selector: 'app-leaf-generic-data-dialog',
  templateUrl: './leaf-generic-data-dialog.component.html',
  styleUrls: ['./leaf-generic-data-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class LeafGenericDataDialogComponent implements OnInit {
  public genericData: { [key: string]: string };
  public targetId: string;
  public targetType: string;
  public expectedGenericDataKeys: string[];
  public keyValuePairs: { key: string, value: string }[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      genericData: { [key: string]: string },
      targetType: string,
      expectedGenericDataKeys: string[],
      targetId: string
    },
    public accountApiClient: AccountApiClient,
    public organizationsApiClientService: OrganizationsApiClientService,
    public dialogRef: MatDialogRef<LeafGenericDataDialogComponent>
  ) {
    this.genericData = { ...data.genericData };
    this.targetType = data.targetType;
    this.expectedGenericDataKeys = data.expectedGenericDataKeys;
    this.targetId = data.targetId;
    this.expectedGenericDataKeys.forEach(key => {
      if (this.genericData[key] === undefined) {
        this.genericData[key] = '';
      }
    });

    this.keyValuePairs = Object.entries(this.genericData).map(([key, value]) => ({ key, value }));

  }

  ngOnInit() {
  }

  addPair() {
    this.keyValuePairs.push({ key: '', value: '' });
    this.syncGenericData();
  }

  deletePair(index: number) {
    this.keyValuePairs.splice(index, 1);
    this.syncGenericData();
  }

  updateKey(index: number, newKey: string) {
    this.keyValuePairs[index].key = newKey;
    this.syncGenericData();
  }

  updateValue(index: number, newValue: string) {
    this.keyValuePairs[index].value = newValue;
    this.syncGenericData();
  }

  syncGenericData() {
    this.genericData = {};
    for (const pair of this.keyValuePairs) {
      if (pair.key) {
        this.genericData[pair.key] = pair.value;
      }
    }
  }

  public submit() {
    if (this.targetType === "account") {
      this.accountApiClient.updateGenericData(this.targetId, this.genericData).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else if (this.targetType === "organization") {
      this.organizationsApiClientService.updateGenericData(this.targetId, this.genericData).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }
}
