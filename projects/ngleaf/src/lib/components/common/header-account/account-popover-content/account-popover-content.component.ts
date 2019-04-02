import { Component, OnInit, Input } from '@angular/core';
import {Router} from "@angular/router";
import { LeafSessionService } from '../../../../services/LeafSession.service';

@Component({
  selector: 'app-account-popover-content',
  templateUrl: './account-popover-content.component.html',
  styleUrls: ['./account-popover-content.component.scss']
})
export class AccountPopoverContentComponent implements OnInit {


  @Input()
  public username: string;

  @Input()
  public avatarUrl: string = 'https://png.pngtree.com/svg/20161013/dpi_user_default_avatar_116868.png';

  constructor(public sessionService: LeafSessionService,
              private router: Router) {
  }

  ngOnInit() {
  }

  logout() {
    this.sessionService.logout();
    this.router.navigate(['/home']);
  }

  goToAccountSettingsPage() {
    this.router.navigate(['settings'])
  }
}