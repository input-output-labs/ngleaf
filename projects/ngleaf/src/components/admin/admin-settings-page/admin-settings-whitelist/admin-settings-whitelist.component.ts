import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { LeafAdminService } from '../../../../services/index';
import { LeafAuthorizedEmailModel } from '../../../../api/models/index';
import { selectAuthorizedEmails } from '../../../../store/core/administration/administration.selectors';

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
    private store: Store,
    private adminService: LeafAdminService,
    public formBuilder: FormBuilder
  ) {
    this.whitelistEmailForm = this.formBuilder.group({
      emails: ['', Validators.required],
    });
    adminService.fetchAuthorizedEmail();
    this.authorizedEmails$ = this.store.select(selectAuthorizedEmails);
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
