import {Component, OnInit} from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { LeafSessionService } from '../../services/LeafSession.service';
import { LeafAccountModel } from '../../models/LeafAccount.model';

@Component({
  selector: 'leaf-header-account',
  templateUrl: './header-account.component.html',
  styleUrls: ['./header-account.component.scss']
})
export class HeaderAccountComponent implements OnInit {

  public currentAccount$: ReplaySubject<LeafAccountModel>;

  constructor(public sessionService: LeafSessionService) { }

  ngOnInit() {
    this.currentAccount$ = this.sessionService.currentAccount$;
  }
}
