import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsViewerComponent } from './statistics-viewer.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

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
