import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { LeafAdminService, LeafSessionService } from '../../../../services/index';

@Component({
  selector: 'leaf-admin-settings-administrators',
  templateUrl: './admin-settings-administrators.component.html',
  styleUrls: ['./admin-settings-administrators.component.scss'],
})
export class AdminSettingsAdministratorsComponent implements OnInit {
  public addAdminForm: FormGroup;

  public administrators$: Observable<string[]>;
  selectedEmails: string[] = [];

  constructor(
    public formBuilder: FormBuilder,
    private adminService: LeafAdminService,
    public sessionService: LeafSessionService
  ) {
    this.addAdminForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
    adminService.fetchAdmins();
    this.administrators$ = adminService.administrators$;
  }

  ngOnInit() {}

  addAmin() {
    if (this.addAdminForm.valid) {
      const { email } = this.addAdminForm.getRawValue();
      this.adminService.addAdmin(email);
    }
  }

  removeAdmins() {
    if (this.selectedEmails.length) {
      this.selectedEmails.forEach((email) => this.adminService.removeAdmin(email));
    }
  }
}
