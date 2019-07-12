import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LeafAccountModel } from '../../../models/leaf-account.model';
import { LeafSessionService } from '../../../services/leaf-session.service';

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
    private router: Router,
    private sessionService: LeafSessionService
  ) {}

  ngOnInit() {
    this.currentRoute = this.router.url;
    this.currentAccount$ = this.sessionService.currentAccount$;
  }
}
