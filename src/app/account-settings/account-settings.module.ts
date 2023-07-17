import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AvatarUpdateComponent, AvatarUpdateModule, PasswordUpdateComponent, PasswordUpdateModule, PseudoUpdateComponent, PseudoUpdateModule } from '@input-output-labs/ngleaf';
import { AccountSettingsLayoutModule } from './account-settings-layout/account-settings-layout.module';
import { AccountSettingsLayoutComponent } from './account-settings-layout/account-settings-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AccountSettingsLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'pseudo',
        pathMatch: 'full',
      },
      {
        path: 'pseudo',
        component: PseudoUpdateComponent,
      },
      {
        path: 'avatar',
        component: AvatarUpdateComponent,
      },
      {
        path: 'password',
        component: PasswordUpdateComponent,
      },
    ],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    /* Leaf deps */
    PseudoUpdateModule,
    AvatarUpdateModule,
    PasswordUpdateModule,
    /* App deps */
    AccountSettingsLayoutModule
  ],
})
export class AccountSettingsModule { }
