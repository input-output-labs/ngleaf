import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordUpdateComponent } from './password-update.component';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';

import { LeafSessionModule } from '../../../../services/index';

@NgModule({
  imports: [
    /* Code deps */
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    /* Material deps */
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    /* Leaf deps */
    LeafSessionModule,
  ],
  declarations: [PasswordUpdateComponent],
  exports: [PasswordUpdateComponent]
})
export class PasswordUpdateModule { }
