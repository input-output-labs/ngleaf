import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LeafAccountModel } from '../../../models/leaf-account.model';
import { selectCurrentAccount } from '../../../store/core/session/session.selectors';

@Component({
  selector: 'leaf-admin-settings-page',
  templateUrl: './admin-settings-page.component.html',
  styleUrls: ['./admin-settings-page.component.scss'],
})
export class AdminSettingsPageComponent implements OnInit {
  public links = [
    {
      link: 'administrators',
      name: 'Administrateurs',
    },
    {
      link: 'whitelist',
      name: 'Emails authorisés',
    },
  ];

  public currentRoute = '';

  public currentAccount$: Observable<LeafAccountModel>;

  constructor(
    private store: Store,
    private router: Router
  ) {
    this.currentAccount$ = this.store.select(selectCurrentAccount);
  }

  ngOnInit() {
    this.currentRoute = this.router.url;
  }
}
