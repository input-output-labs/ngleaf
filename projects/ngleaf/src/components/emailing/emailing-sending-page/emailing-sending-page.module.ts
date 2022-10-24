import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatStepperModule } from "@angular/material/stepper";
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';

import { EmailingSendingPageComponent } from "./emailing-sending-page.component";
import { EmailingApiClientModule } from "../../../api";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  imports: [
    /* Common deps */
    CommonModule,
    ReactiveFormsModule,
    /* Material deps */
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatStepperModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatExpansionModule,
    /* Leaf deps */
    EmailingApiClientModule,
  ],
  declarations: [EmailingSendingPageComponent],
  exports: [EmailingSendingPageComponent],
})
export class EmailingSendingPageModule {}
