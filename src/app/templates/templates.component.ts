import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LeafWebImagesSeekerDialogComponent } from '@input-output-labs/ngleaf';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css'],
})
export class TemplatesComponent {
  public passwordCheckClasses = {show: ['show-class'], hide: ['hide-class']};
  selectedImageUrl: string;
  name: string;

  constructor(private dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(LeafWebImagesSeekerDialogComponent, {
      width: '450px',
      data: { prefill: this.name }
    }).afterClosed().subscribe(result => {
      console.log('you picked: ', result);
      this.selectedImageUrl = result;
    });
  }

  onDone() {
    console.log('password forgotten done');
  }
}

