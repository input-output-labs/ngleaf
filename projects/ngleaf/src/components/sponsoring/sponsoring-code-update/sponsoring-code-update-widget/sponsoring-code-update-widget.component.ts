import { Component, Input, Output, EventEmitter} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LeafAccountModel } from '../../../../api/models/leaf-account.model';
import { SponsoringCodeUpdateDialogComponent } from '../sponsoring-code-update-dialog/sponsoring-code-update-dialog.component';

@Component({
  standalone: false,
  selector: 'leaf-sponsoring-code-update-widget',
  templateUrl: './sponsoring-code-update-widget.component.html',
  styleUrls: ['./sponsoring-code-update-widget.component.scss']
})
export class SponsoringCodeUpdateWidgetComponent {
  @Input()
  public account: LeafAccountModel;

  @Output()
  public onChanged: EventEmitter<void> = new EventEmitter<void>();

  constructor(private dialog: MatDialog) {}

  public openSponsorCodeUpdateDialog() {
    const dialogRef = this.dialog.open(SponsoringCodeUpdateDialogComponent, {
      maxWidth: "400px",
      data: {
        account: this.account
      }
    });
    dialogRef.afterClosed().subscribe((changed) => {
      if (changed) {
        this.onChanged.emit();
      }
    });
  }
}
