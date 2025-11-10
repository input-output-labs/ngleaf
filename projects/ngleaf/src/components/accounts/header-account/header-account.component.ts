import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { LeafAccountModel } from '../../../api/models/index';
import { selectCurrentAccountData } from '../../../store/core/session/session.selectors';

@Component({
  standalone: false,
  selector: 'leaf-header-account',
  templateUrl: './header-account.component.html',
  styleUrls: ['./header-account.component.scss'],
})
export class LeafHeaderAccountComponent {
  public currentAccount$: Observable<LeafAccountModel>;

  constructor(private store: Store, private router: Router) {
    this.currentAccount$ = this.store.select(selectCurrentAccountData);
  }

  public goToLogin() {
    this.router.navigateByUrl('/login');
  }

  public goToRegister() {
    this.router.navigateByUrl('/register');
  }
}
