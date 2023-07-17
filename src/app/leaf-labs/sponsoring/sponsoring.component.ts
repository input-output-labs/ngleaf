import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { LeafAccountModel, selectCurrentAccountData } from '@input-output-labs/ngleaf';
import { Observable, filter, map } from 'rxjs';

@Component({
  selector: 'app-sponsoring',
  templateUrl: './sponsoring.component.html',
  styleUrls: ['./sponsoring.component.scss']
})
export class SponsoringComponent implements OnInit {
  public currentAccount$: Observable<LeafAccountModel>;

  public sponsoring: any = {
    sponsorId: '0123456789'
  };

  constructor(private store: Store) {
    this.currentAccount$ = this.store.pipe(
      select(selectCurrentAccountData),
    );}

  ngOnInit() {
  }

}
