import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LeafAccountModel } from '../../../models/leaf-account.model';
import { LeafSessionService } from '../../../services/core/session/leaf-session.service';

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
    private router: Router,
    private sessionService: LeafSessionService
  ) {}

  ngOnInit() {
    this.currentRoute = this.router.url;
    this.currentAccount$ = this.sessionService.currentAccount$;
  }
}
