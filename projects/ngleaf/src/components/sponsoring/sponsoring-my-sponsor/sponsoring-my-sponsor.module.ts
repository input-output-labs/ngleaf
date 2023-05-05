import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SponsoringMySponsorComponent } from './sponsoring-my-sponsor.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { SponsoringApiClientModule } from '../../../api/clients/index';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    /* Core deps */
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    /* Material deps */
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    /* Leaf deps */
    SponsoringApiClientModule,
  ],
  declarations: [SponsoringMySponsorComponent],
  exports: [SponsoringMySponsorComponent]
})
export class SponsoringMySponsorModule { }
