import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsViewerComponent } from './statistics-viewer.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';

@NgModule({
  imports: [
    /* Core deps */
    CommonModule,
    ReactiveFormsModule,
    /* Mat deps */
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    /* Other deps */
    NgxChartsModule
  ],
  declarations: [StatisticsViewerComponent],
  exports: [StatisticsViewerComponent]
})
export class StatisticsViewerModule { }
