import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectMailingsUnsubscription } from '../../../store';
import { LeafSessionService } from '../../../services/core/session';
import { filter } from 'rxjs';

@Component({
  selector: 'leaf-mailing-authorizations-page',
  templateUrl: './mailing-authorizations-page.component.html',
  styleUrls: ['./mailing-authorizations-page.component.scss']
})
export class MailingAuthorizationsPageComponent implements OnInit {
  public type: string;
  public email: string;
  public status: 'success' | 'failure' | undefined;

  constructor(private activatedRoute: ActivatedRoute, private sessionService: LeafSessionService, private store: Store) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.type = params.type;
      this.email = params.email;
    });
  }

  public unsubscribe() {
    this.status = undefined;
    if (this.email && this.type) {
      this.sessionService.unsubscribeFromEmail(this.email, this.type);
      this.store.pipe(
        select(selectMailingsUnsubscription),
        filter(item => !item.status.pending)
      ).subscribe((item) => {
        if (item.status.success) {
          this.status = 'success';
        } else {
          this.status = 'failure';
        }
      });
    }
  }
}
