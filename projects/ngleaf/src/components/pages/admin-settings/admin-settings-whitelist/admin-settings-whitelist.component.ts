import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeafAdminService } from '../../../../services/leaf-admin.service';
import { Observable } from 'rxjs';
import { LeafAuthorizedEmailModel } from '../../../../models/leaf-authorized-email.model';

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
