import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LeafConfig, LeafConfigServiceToken, LeafSessionService } from '@input-output-labs/ngleaf';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(public sessionService: LeafSessionService, private router: Router, @Inject(LeafConfigServiceToken) public config: LeafConfig) { }

  logout() {
    this.sessionService.logout();
  }
}
