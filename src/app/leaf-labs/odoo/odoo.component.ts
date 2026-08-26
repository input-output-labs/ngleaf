import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-odoo-labs',
  templateUrl: './odoo.component.html',
  styleUrls: ['./odoo.component.scss'],
})
export class OdooComponent {
  public readonly form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      odooContactId: [''],
      odooOpportunityId: [''],
      odooProductId: [''],
    });
  }
}
