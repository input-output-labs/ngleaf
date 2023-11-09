import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafPlanViewerComponent } from './leaf-plan-viewer.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    /* Core deps */
    CommonModule,
    TranslateModule,
    /* Material deps */
    MatDividerModule,
    MatButtonModule,
  ],
  declarations: [LeafPlanViewerComponent],
  exports: [LeafPlanViewerComponent]
})
export class LeafPlanViewerModule { }
