import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { LeafAccountModel } from '../../../../api/models/index';
import { selectCurrentAccountData } from '../../../../store/core/session/session.selectors';

@Component({
  selector: 'leaf-account-settings-page',
  templateUrl: './account-settings-page.component.html',
  styleUrls: ['./account-settings-page.component.scss'],
})
export class AccountSettingsPageComponent implements OnInit {
  public links = [
    {
      link: 'general',
      name: 'General',
    },
    {
      link: 'avatar',
      name: 'Avatar',
    },
    {
      link: 'password',
      name: 'Password',
    },
    {
      link: 'accesstokens',
      name: 'Access Tokens',
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
