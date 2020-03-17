import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { LeafAdminService } from '../../../../services/index';
import { LeafAuthorizedEmailModel } from '../../../../models/index';

@Component({
  selector: 'leaf-admin-settings-whitelist',
  templateUrl: './admin-settings-whitelist.component.html',
  styleUrls: ['./admin-settings-whitelist.component.scss'],
})
export class AdminSettingsWhitelistComponent implements OnInit {
  public whitelistEmailForm: FormGroup;

  public authorizedEmails$: Observable<LeafAuthorizedEmailModel[]>;
  selectedEmails: string[] = [];

  constructor(
    private adminService: LeafAdminService,
    public formBuilder: FormBuilder
  ) {
    this.whitelistEmailForm = this.formBuilder.group({
      emails: ['', Validators.required],
    });
    adminService.fetchAuthorizedEmail();
    this.authorizedEmails$ = adminService.authorizedEmails$;
  }

  ngOnInit() {}

  public whitelistEmail() {
    if (this.whitelistEmailForm.valid) {
      const emailsInput = this.whitelistEmailForm.getRawValue().emails;
      const emails = emailsInput.split(';').map((email) => email.trim());
      this.adminService.addAuthorizedEmail(emails);
      this.whitelistEmailForm.setValue({emails: ''});
    }
  }

  public removeEmails() {
    if (this.selectedEmails.length) {
      this.adminService.removeAuthorizedEmail(this.selectedEmails);
    }
  }
}
