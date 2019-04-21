import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeafSessionService } from '../../../../services/leaf-session.service';

@Component({
  selector: 'leaf-admin-settings-administrators',
  templateUrl: './admin-settings-administrators.component.html',
  styleUrls: ['./admin-settings-administrators.component.scss'],
})
export class AdminSettingsAdministratorsComponent implements OnInit {
  public addAdminForm: FormGroup;

  public administrators: string[];

  constructor(
    public formBuilder: FormBuilder,
    public sessionService: LeafSessionService
  ) {
    this.administrators = ['remi@bogoss.fr', 'jeanpol@noobs.com'];
    this.addAdminForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }

  ngOnInit() {}

  changeName() {
    if (this.addAdminForm.valid) {
      const { email } = this.addAdminForm.getRawValue();
      this.sessionService.changeUsername(email);
    }
  }

  removeAdmins() {
    // TODO
  }
}
