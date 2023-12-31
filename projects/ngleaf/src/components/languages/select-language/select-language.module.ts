import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { TranslateModule } from "@ngx-translate/core";

import { SelectLanguageComponent } from "./select-language.component";

@NgModule({
  declarations: [SelectLanguageComponent],
  imports: [
    /* Core deps */
    CommonModule,
    TranslateModule,
    /* Material deps */
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [SelectLanguageComponent],
})
export class SelectLanguageModule {}
