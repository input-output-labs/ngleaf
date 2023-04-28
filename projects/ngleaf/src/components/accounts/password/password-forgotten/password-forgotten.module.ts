import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafPasswordForgottenComponent } from './password-forgotten.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

@NgModule({
  imports: [
    /* Core deps */
    CommonModule,
    ReactiveFormsModule,
    StoreModule,
    TranslateModule,
    /* Material deps */
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  declarations: [LeafPasswordForgottenComponent],
  exports: [LeafPasswordForgottenComponent]
})
export class LeafPasswordForgottenModule { }
