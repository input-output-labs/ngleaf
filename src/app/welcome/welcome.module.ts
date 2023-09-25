import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { LeafAuthGuardModule, LeafAuthGuardService } from '@input-output-labs/ngleaf';
import { WelcomeLayoutComponent } from './welcome-layout/welcome-layout.component';
import { WelcomeLayoutModule } from './welcome-layout/welcome-layout.module';
import { LoginPageModule } from './login-page/login-page.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { RegisterPageModule } from './register-page/register-page.module';
import { PasswordPageComponent } from './password-page/password-page.component';
import { PasswordPageModule } from './password-page/password-page.module';
import { OrganizationInvitationPageModule } from './organization-invitation-page/organization-invitation-page.module';
import { OrganizationInvitationPageComponent } from './organization-invitation-page/organization-invitation-page.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'register',
        component: RegisterPageComponent,
      },
      {
        path: 'password-reset',
        component: PasswordPageComponent,
      },
      {
        path: 'invitation',
        canActivate: [LeafAuthGuardService],
        component: OrganizationInvitationPageComponent,
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    LoginPageModule,
    PasswordPageModule,
    RegisterPageModule,
    OrganizationInvitationPageModule,
    WelcomeLayoutModule,
    LeafAuthGuardModule,
  ],
  declarations: [WelcomeComponent]
})
export class WelcomeModule { }
