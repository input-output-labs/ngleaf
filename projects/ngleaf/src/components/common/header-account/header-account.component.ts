import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { LeafSessionService } from '../../../services/leaf-session.service';
import { LeafAccountModel } from '../../../models/leaf-account.model';

@Component({
  selector: 'leaf-header-account',
  templateUrl: './header-account.component.html',
  styleUrls: ['./header-account.component.scss'],
})
export class HeaderAccountComponent implements OnInit {
  public currentAccount$: ReplaySubject<LeafAccountModel>;

  constructor(public sessionService: LeafSessionService) {}

  ngOnInit() {
    this.currentAccount$ = this.sessionService.currentAccount$;
  }
}
