import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LeafAccountModel } from '../../../api/models/index';
import { selectCurrentAccountData } from '../../../store/core/session/session.selectors';

@Component({
  selector: 'leaf-admin-settings-page',
  templateUrl: './admin-settings-page.component.html',
  styleUrls: ['./admin-settings-page.component.scss'],
})
export class AdminSettingsPageComponent implements OnInit {
  public links = [
    {
      link: 'users',
      name: 'Utilisateurs',
    },
    {
      link: 'administrators',
      name: 'Administrateurs',
    },
    {
      link: 'whitelist',
      name: 'Emails authorisés',
    },
    {
      link: 'emailing',
      name: 'Envoie d\'emails',
    },
  ];

  public currentRoute = '';

  public currentAccount$: Observable<LeafAccountModel>;

  constructor(
    private store: Store,
    private router: Router
  ) {
    this.currentAccount$ = this.store.select(selectCurrentAccountData);
  }

  ngOnInit() {
    this.currentRoute = this.router.url;
  }
}
