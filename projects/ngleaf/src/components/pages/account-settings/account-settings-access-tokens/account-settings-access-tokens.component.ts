import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { LeafSessionService } from '../../../../services/index';
import { LeafAccountModel } from '../../../../models/index';

@Component({
  selector: 'leaf-account-settings-access-tokens',
  templateUrl: './account-settings-access-tokens.component.html',
  styleUrls: ['./account-settings-access-tokens.component.scss']
})
export class AccountSettingsAccessTokensComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'creation', 'expiration', 'action'];
  public privateTokenCreationForm: FormGroup;

  public currentAccount$: Observable<LeafAccountModel>;

  public createdToken: string = null;

  constructor(
    public formBuilder: FormBuilder,
    private sessionService: LeafSessionService
  ) {
    this.privateTokenCreationForm = this.formBuilder.group({
      name: ['', Validators.required],
      expiration: [''],
    });
  }

  ngOnInit() {
    this.currentAccount$ = this.sessionService.currentAccount$;
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
