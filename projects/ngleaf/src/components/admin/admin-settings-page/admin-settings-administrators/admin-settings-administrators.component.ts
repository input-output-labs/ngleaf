import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { LeafAdminService } from '../../../../services/index';
import { selectAdministrators } from '../../../../store/core/administration/administration.selectors';

@Component({
  selector: 'leaf-admin-settings-administrators',
  templateUrl: './admin-settings-administrators.component.html',
  styleUrls: ['./admin-settings-administrators.component.scss'],
})
export class AdminSettingsAdministratorsComponent implements OnInit {
  public addAdminForm: UntypedFormGroup;

  public administrators$: Observable<string[]>;
  selectedEmails: string[] = [];

  constructor(
    private store: Store,
    private formBuilder: UntypedFormBuilder,
    private adminService: LeafAdminService
  ) {
    this.addAdminForm = this.formBuilder.group({
      user: [null, Validators.required],
    });
    adminService.fetchAdmins();
    this.administrators$ = this.store.select(selectAdministrators);
  }

  ngOnInit() {}

  addAmin() {
    if (this.addAdminForm.valid) {
      const { user } = this.addAdminForm.getRawValue();
      this.adminService.addAdmin(user.id);
    }
  }

  removeAdmins() {
    if (this.selectedEmails.length) {
      this.selectedEmails.forEach((email) => this.adminService.removeAdmin(email));
    }
  }
}
