import { Component, Input } from '@angular/core';
import { SectionConfig } from '../models';

@Component({
  selector: 'leaf-sections-bar',
  templateUrl: './sections-bar.component.html',
  styleUrls: ['./sections-bar.component.scss']
})
export class SectionsBarComponent {

  @Input()
  public sections: SectionConfig[] = [{
    color: 'lightgray',
    relativeWidth: 1
  }];

  constructor() { }

}
