import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { UserSelectorComponent } from './user-selector.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { UserAutocompleteService } from './user-autocomplete.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    /* Material */
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [UserAutocompleteService],
  declarations: [UserSelectorComponent],
  exports: [UserSelectorComponent]
})
export class UserSelectorModule { }
