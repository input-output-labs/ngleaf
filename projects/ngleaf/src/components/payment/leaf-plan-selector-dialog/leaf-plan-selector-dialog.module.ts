import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafPlanSelectorDialogComponent } from './leaf-plan-selector-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LeafPlanSelectorModule } from '../public-api';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    /* Material deps */
    MatDialogModule,
    MatButtonModule,
    /* Leaf module */
    LeafPlanSelectorModule,
  ],
  declarations: [LeafPlanSelectorDialogComponent]
})
export class LeafPlanSelectorDialogModule { }
