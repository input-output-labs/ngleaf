import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MatLegacyTableModule as MatTableModule } from "@angular/material/legacy-table";
import { MatLegacyProgressBarModule as MatProgressBarModule } from "@angular/material/legacy-progress-bar";

import { EmailingCategoriesPageComponent } from "./emailing-categories-page.component";
import { GenericFormModule } from "../../common/generic-form/generic-form.module";
import { EmailingApiClientModule } from "../../../api";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  imports: [
    /* Common deps */
    CommonModule,
    ReactiveFormsModule,
    /* Material deps */
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatProgressBarModule,
    /* Leaf deps */
    GenericFormModule,
    EmailingApiClientModule,
  ],
  declarations: [EmailingCategoriesPageComponent],
  exports: [EmailingCategoriesPageComponent],
})
export class EmailingCategoriesPageModule {}
