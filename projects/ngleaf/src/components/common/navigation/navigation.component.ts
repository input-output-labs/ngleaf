import { Component, Input, TemplateRef } from '@angular/core';

export interface NavigationItem {
  link: string;
  label: string;
}

@Component({
  standalone: false,
  selector: 'leaf-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  @Input() headerTemplate: TemplateRef<any>;
  @Input() contentTemplate: TemplateRef<any>;

  @Input() links: NavigationItem[];
  @Input() title = 'app';

  constructor() {
  }

}
