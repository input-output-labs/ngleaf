import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericFormComponent } from './generic-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSliderModule} from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';

import { UserSelectorModule } from '../../admin/user-selector/user-selector.module';

@NgModule({
  imports: [
    /* Common deps */
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    /* Material deps */
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSliderModule,
    MatSelectModule,
    /* Leaf deps */
    UserSelectorModule
  ],
  declarations: [GenericFormComponent],
  exports: [GenericFormComponent]
})
export class GenericFormModule { }
