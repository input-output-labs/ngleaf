import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';

import { LeafSessionService } from '../../../services/index';
import { LeafAccountModel } from '../../../models/index';

@Component({
  selector: 'leaf-header-account',
  templateUrl: './header-account.component.html',
  styleUrls: ['./header-account.component.scss'],
})
export class HeaderAccountComponent implements OnInit {
  public currentAccount$: ReplaySubject<LeafAccountModel>;

  constructor(public sessionService: LeafSessionService, private router: Router) {}

  ngOnInit() {
    this.currentAccount$ = this.sessionService.currentAccount$;
  }

  public goToLogin() {
    this.router.navigateByUrl('/login');
  }

  public goToRegister() {
    this.router.navigateByUrl('/register');
  }
}
