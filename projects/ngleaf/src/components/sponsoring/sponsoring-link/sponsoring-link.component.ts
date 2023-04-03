import { Component, Inject, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { selectCurrentAccount } from '../../../store/core/session/session.selectors';

@Component({
  selector: 'leaf-sponsoring-link',
  templateUrl: './sponsoring-link.component.html',
  styleUrls: ['./sponsoring-link.component.scss']
})
export class SponsoringLinkComponent implements OnInit {
  public sponsorCode$: Observable<string>;
  public sponsorLink$: Observable<string>;

  public hostname: string;

  @Input()
  public sponsoring: any;

  constructor(private store: Store, @Inject(Window) private _window: Window) {
    const origin = this._window.location.origin;
    this.hostname = `${origin}/`;

    const currentAccount$ = this.store.pipe(
      select(selectCurrentAccount),
      filter(asyncItem => !asyncItem.status.pending),
      map(asyncItem => asyncItem.data),
    );

    this.sponsorCode$ = currentAccount$.pipe(
      map(account => account?.id)
    );
    this.sponsorLink$ = this.sponsorCode$.pipe(
      map(sponsorCode => `${this.hostname}?sponsorCode=${sponsorCode}`)
    );
  }

  ngOnInit() {
  }

}
