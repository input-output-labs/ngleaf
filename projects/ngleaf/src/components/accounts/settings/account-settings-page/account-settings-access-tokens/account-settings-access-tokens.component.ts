import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { LeafSessionService } from '../../../../../services/index';
import { LeafAccountModel } from '../../../../../api/models/index';
import { selectCurrentAccountData } from '../../../../../store/core/session/session.selectors';

@Component({
  standalone: false,
  selector: 'leaf-account-settings-access-tokens',
  templateUrl: './account-settings-access-tokens.component.html',
  styleUrls: ['./account-settings-access-tokens.component.scss']
})
export class AccountSettingsAccessTokensComponent {
  public displayedColumns: string[] = ['name', 'creation', 'expiration', 'action'];
  public privateTokenCreationForm: UntypedFormGroup;

  public currentAccount$: Observable<LeafAccountModel>;

  public createdToken: string = null;

  constructor(
    private store: Store,
    public formBuilder: UntypedFormBuilder,
    private sessionService: LeafSessionService
  ) {
    this.currentAccount$ = this.store.select(selectCurrentAccountData);
    this.privateTokenCreationForm = this.formBuilder.group({
      name: ['', Validators.required],
      expiration: [''],
    });
  }

  public addPrivateToken() {
    if (this.privateTokenCreationForm.valid) {
      const { name, expiration } = this.privateTokenCreationForm.getRawValue();
      this.sessionService.addPrivateToken(name, expiration).then(token => this.createdToken = token);
    }
  }

  public revokePrivateToken(name) {
    this.sessionService.revokePrivateToken(name);
  }
}
