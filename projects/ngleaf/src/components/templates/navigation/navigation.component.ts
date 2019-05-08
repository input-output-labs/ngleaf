import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'leaf-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  @Input() headerTemplate: TemplateRef<any>;
  @Input() contentTemplate: TemplateRef<any>;

  @Input() links: any[];
  @Input() title = 'app';

  constructor() {
  }

}
