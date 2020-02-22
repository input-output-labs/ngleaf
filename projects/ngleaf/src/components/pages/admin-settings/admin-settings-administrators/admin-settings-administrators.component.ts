import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeafSessionService } from '../../../../services/leaf-session.service';
import { LeafAdminService } from '../../../../services/leaf-admin.service';
import { Observable } from 'rxjs';

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
