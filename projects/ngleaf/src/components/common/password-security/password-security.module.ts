import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LeafPasswordSecurityIndicatorComponent } from './password-security-indicator.component';
import { LeafPasswordSecurityService } from './password-security.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  declarations: [
    LeafPasswordSecurityIndicatorComponent
  ],
  providers: [
    LeafPasswordSecurityService
  ],
  exports: [
    LeafPasswordSecurityIndicatorComponent
  ]
})
export class LeafPasswordSecurityModule { }

