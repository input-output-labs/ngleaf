import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'leaf-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  @Input() contentTemplate: TemplateRef<any>;

  constructor() {
  }

}
