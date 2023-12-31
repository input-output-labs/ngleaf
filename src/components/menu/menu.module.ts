import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { LeafSessionModule, OrganizationSelectorModule, NotificationsWidgetModule, SelectLanguageModule } from '@input-output-labs/ngleaf';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';
import { UiStoreModule } from '../../stores/ui-store/ui-store.module';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    /* Core deps */
    CommonModule,
    RouterModule,
    TranslateModule,
    /* Material deps */
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,
    /* Leaf deps */
    LeafSessionModule,
    OrganizationSelectorModule,
    NotificationsWidgetModule,
    SelectLanguageModule,
    /* Blank deps */
    UiStoreModule,
  ],
  declarations: [MenuComponent],
  exports: [MenuComponent]
})
export class MenuModule { }
