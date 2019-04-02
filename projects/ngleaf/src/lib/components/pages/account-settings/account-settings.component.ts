import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LeafAccountModel } from '../../../models/LeafAccount.model';
import { LeafSessionService } from '../../../services/LeafSession.service';

@Component({
  selector: 'app-account-settings-page',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  public links = [{
    link:'general',
    name: 'General'
  },{
    link:'avatar',
    name: 'Avatar'
  },{
    link:'password',
    name: 'Mot de passe'
  }];

  public currentRoute = '';

  public currentAccount$: Observable<LeafAccountModel>;

  constructor(private router: Router, private sessionService: LeafSessionService) { }

  ngOnInit() {
    this.currentRoute = this.router.url;
    this.currentAccount$ = this.sessionService.currentAccount$;
  }

}
