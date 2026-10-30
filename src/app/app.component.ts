import { Component } from '@angular/core';
import { DemoUiConfigService } from './ui-config/demo-ui-config.service';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(uiConfig: DemoUiConfigService) {
    void uiConfig;
  }
}

