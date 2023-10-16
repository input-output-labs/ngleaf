import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LeafConfig, LeafConfigServiceToken, LeafSessionService } from '@input-output-labs/ngleaf';
import { Store } from '@ngrx/store';
import { selectMenuExpanded } from '../../stores/ui-store/ui-store.selectors';
import { setMenuExpanded } from '../../stores/ui-store/ui-store.actions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  public menuExpanded$: Observable<boolean>;

  constructor(public sessionService: LeafSessionService, private store: Store, private router: Router, @Inject(LeafConfigServiceToken) public config: LeafConfig) {
    this.menuExpanded$ = this.store.select(selectMenuExpanded);
  }

  logout() {
    this.sessionService.logout();
  }

  public setMenuExpanded(menuExpanded: boolean) {
    this.store.dispatch(setMenuExpanded({menuExpanded}))
  }
}
