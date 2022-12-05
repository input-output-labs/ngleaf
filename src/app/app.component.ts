import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ngleaf-app';

  public links = [
    {
      label: 'My Settings',
      link: 'settings/general'
    },
    {
      label: 'Admin panel',
      link: 'admin/users'
    },
    {
      label: 'Common templates',
      link: 'templates'
    },
    {
      label: 'Statistics demo',
      link: 'statistics'
    },
    {
      label: 'Messenger demo',
      link: 'messenger'
    },
    {
      label: 'Sponsoring demo',
      link: 'sponsoring'
    }
  ];

  constructor() {}
}

