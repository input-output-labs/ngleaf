import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import {
  ProfileUpdateModule,
  AccountSettingsProfileComponent,
  AvatarUpdateComponent,
  AvatarUpdateModule,
  PasswordUpdateComponent,
  AccountSettingsProfileModule,
  PseudoUpdateComponent,
  PseudoUpdateModule,
  EmailVerificationComponent,
  EmailVerificationModule,
} from "@input-output-labs/ngleaf";
import { AccountSettingsLayoutModule } from "./account-settings-layout/account-settings-layout.module";
import { AccountSettingsLayoutComponent } from "./account-settings-layout/account-settings-layout.component";

const routes: Routes = [
  {
    path: "",
    component: AccountSettingsLayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "profile",
        pathMatch: "full",
      },
      {
        path: "profile",
        component: AccountSettingsProfileComponent,
      },
      {
        path: "pseudo",
        component: PseudoUpdateComponent,
      },
      {
        path: "avatar",
        component: AvatarUpdateComponent,
      },
      {
        path: "password",
        component: PasswordUpdateComponent,
      },
      {
        path: "email-verification",
        component: EmailVerificationComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    /* Leaf deps */
    ProfileUpdateModule,
    PseudoUpdateModule,
    AvatarUpdateModule,
    AccountSettingsProfileModule,
    EmailVerificationModule,
    /* App deps */
    AccountSettingsLayoutModule,
  ],
})
export class AccountSettingsModule {}
