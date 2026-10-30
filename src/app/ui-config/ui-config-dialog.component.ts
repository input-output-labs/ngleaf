import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DemoMatFieldDraft, DemoUiConfigService } from './demo-ui-config.service';

@Component({
  standalone: false,
  selector: 'app-ui-config-dialog',
  templateUrl: './ui-config-dialog.component.html',
  styleUrls: ['./ui-config-dialog.component.scss'],
})
export class UiConfigDialogComponent {
  draft: DemoMatFieldDraft;

  constructor(
    private dialogRef: MatDialogRef<UiConfigDialogComponent>,
    private uiConfig: DemoUiConfigService,
  ) {
    this.draft = this.uiConfig.current();
  }

  apply(): void {
    this.uiConfig.apply(this.draft);
    this.dialogRef.close();
  }

  reset(): void {
    this.draft = this.uiConfig.reset();
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
