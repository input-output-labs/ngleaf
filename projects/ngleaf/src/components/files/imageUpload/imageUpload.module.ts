import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { TranslateModule } from "@ngx-translate/core";

import { LeafUploadFileModule } from "../../../services/files/index";
import { LeafImageUploadComponent } from "./imageUpload.component";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    /* Material */
    MatProgressSpinnerModule,
    /* Leaf deps */
    LeafUploadFileModule,
  ],
  declarations: [LeafImageUploadComponent],
  exports: [LeafImageUploadComponent],
})
export class LeafImageUploadModule {}
