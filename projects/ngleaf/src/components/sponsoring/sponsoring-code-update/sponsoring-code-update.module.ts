import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { SponsoringApiClientModule } from '../../../api';
import { SponsoringCodeUpdateComponent } from './sponsoring-code-update/sponsoring-code-update.component';
import { SponsoringCodeUpdateWidgetComponent } from './sponsoring-code-update-widget/sponsoring-code-update-widget.component';
import { SponsoringCodeUpdateDialogComponent } from './sponsoring-code-update-dialog/sponsoring-code-update-dialog.component';

@NgModule({
  imports: [
    /* Core deps */
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    /* Material deps */
    MatIconModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    /* Leaf deps */
    SponsoringApiClientModule,
  ],
  declarations: [SponsoringCodeUpdateComponent, SponsoringCodeUpdateWidgetComponent, SponsoringCodeUpdateDialogComponent],
  exports: [SponsoringCodeUpdateComponent, SponsoringCodeUpdateWidgetComponent, SponsoringCodeUpdateDialogComponent],
})
export class SponsoringCodeUpdateModule { }
