import { Component } from '@angular/core';
import { LeafWebImagesSeekerService } from '@input-output-labs/ngleaf';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css'],
})
export class TemplatesComponent {
  selectedImageUrl: string;
  name: string;

  constructor(private webImagesSeekerService: LeafWebImagesSeekerService) {}

  openDialog(): void {
    this.webImagesSeekerService.openDialog(this.name).subscribe(result => {
      console.log('you picked: ', result);
      this.selectedImageUrl = result;
    });
  }
}

