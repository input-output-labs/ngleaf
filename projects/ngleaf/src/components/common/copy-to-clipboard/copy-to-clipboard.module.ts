import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";

import { LeafCopyToClipboardComponent } from "./copy-to-clipboard.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [LeafCopyToClipboardComponent],
  imports: [
    CommonModule,
    TranslateModule,
    /** Material deps */
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  exports: [LeafCopyToClipboardComponent],
})
export class LeafCopyToClipboardModule {}
