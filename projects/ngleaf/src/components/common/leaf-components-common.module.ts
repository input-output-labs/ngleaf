import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  MatIconModule,
  MatDividerModule,
  MatInputModule,
  MatButtonModule,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdePopoverModule } from '@material-extended/mde';

import { AccountPopoverContentComponent } from './header-account/account-popover-content/account-popover-content.component';
import { HeaderAccountComponent } from './header-account/header-account.component';
import { ImageUploadComponent } from './imageUpload/imageUpload.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginModule } from './login/login.module';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MdePopoverModule,
    RouterModule,
    MatDividerModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    LoginModule,
  ],
  declarations: [
    AccountPopoverContentComponent,
    HeaderAccountComponent,
    ImageUploadComponent,
    RegisterComponent,
  ],
  exports: [
    AccountPopoverContentComponent,
    HeaderAccountComponent,
    ImageUploadComponent,
    LoginComponent,
    RegisterComponent,
  ],
})
export class LeafComponentsCommonModule {}
