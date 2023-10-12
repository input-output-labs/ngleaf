import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

import { LeafAddressFormComponent } from "./address-form.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    /* Material */
    MatFormFieldModule,
    MatInputModule,
  ],
  declarations: [LeafAddressFormComponent],
  exports: [LeafAddressFormComponent],
})
export class LeafAddressFormModule {}
