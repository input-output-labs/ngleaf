import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'leaf-admin-settings-whitelist',
  templateUrl: './admin-settings-whitelist.component.html',
  styleUrls: ['./admin-settings-whitelist.component.scss'],
})
export class AdminSettingsWhitelistComponent implements OnInit {
  public whitelistEmailForm: FormGroup;

  public whitelistedEmails: string[];

  constructor(
    public formBuilder: FormBuilder
  ) {
    this.whitelistedEmails = ['remi@bogoss.fr', 'jeanpol@noobs.com'];
    this.whitelistEmailForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }

  ngOnInit() {}

  whitelistEmail() {
    if (this.whitelistEmailForm.valid) {
    }
  }

  removeEmails() {
    // TODO
  }
}
