import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './menu.component';
import { RouterModule } from '@angular/router';
import { LeafSessionModule, OrganizationSelectorModule } from '@input-output-labs/ngleaf';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { UiConfigDialogComponent } from '../../app/ui-config/ui-config-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    LeafSessionModule,
    OrganizationSelectorModule
  ],
  declarations: [MenuComponent, UiConfigDialogComponent],
  exports: [MenuComponent]
})
export class MenuModule { }
