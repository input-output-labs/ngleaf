import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { MatProgressBarModule } from "@angular/material/progress-bar";

import { EmailingCategoriesPageComponent } from "./emailing-categories-page.component";
import { GenericFormModule } from "../../common/generic-form/generic-form.module";
import { EmailingApiClientModule } from "../../../api";
import { MatButtonModule } from "@angular/material/button";
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
