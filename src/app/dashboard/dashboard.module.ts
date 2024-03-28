import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminSettingsUsersModule } from '@input-output-labs/ngleaf';

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    AdminSettingsUsersModule,
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
