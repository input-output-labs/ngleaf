import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

import { LeafAddressFormComponent } from "./address-form.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    /* Material */
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  declarations: [LeafAddressFormComponent],
  exports: [LeafAddressFormComponent],
})
export class LeafAddressFormModule {}
