import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  imports: [CommonModule],
})
export class LayoutComponent {
  @Input() eyebrow?: string;
  @Input() title?: string;
  @Input() baseline?: string;

  /**
   * Displays a loading overlay on top of the layout content.
   * Default is false.
   */
  @Input() loading: boolean = false;
}
