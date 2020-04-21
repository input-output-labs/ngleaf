import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { MdePopoverModule } from '@material-extended/mde';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import {
  AccountPopoverContentComponent,
  HeaderAccountComponent,
  ImageUploadComponent,
  LoginComponent,
  RegisterComponent,
  AccountSettingsAvatarComponent,
  AccountSettingsAccessTokensComponent,
  AccountSettingsGeneralComponent,
  AccountSettingsPasswordComponent,
  AccountSettingsPageComponent,
  AdminSettingsAdministratorsComponent,
  AdminSettingsWhitelistComponent,
  AdminSettingsPageComponent,
  LoginPageComponent,
  RegisterPageComponent,
  AddressFormComponent,
  NavigationComponent,
  TableComponent,
  TodoListComponent,
  TreeComponent,
  ForbiddenComponent
} from './components/index';

@NgModule({
  declarations: [
    AccountPopoverContentComponent,
    HeaderAccountComponent,
    ImageUploadComponent,
    LoginComponent,
    RegisterComponent,
    AccountSettingsAvatarComponent,
    AccountSettingsAccessTokensComponent,
    AccountSettingsGeneralComponent,
    AccountSettingsPasswordComponent,
    AccountSettingsPageComponent,
    AdminSettingsAdministratorsComponent,
    AdminSettingsWhitelistComponent,
    AdminSettingsPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    AddressFormComponent,
    NavigationComponent,
    TableComponent,
    TodoListComponent,
    TreeComponent,
    ForbiddenComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DragDropModule,
    /* Material Imports */
    MatIconModule,
    MdePopoverModule,
    MatDividerModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    MatFormFieldModule,
    MatOptionModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatTreeModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  exports: [
    AccountPopoverContentComponent,
    HeaderAccountComponent,
    ImageUploadComponent,
    LoginComponent,
    RegisterComponent,
    AccountSettingsPageComponent,
    AdminSettingsPageComponent,
    AccountSettingsAccessTokensComponent,
    LoginPageComponent,
    RegisterPageComponent,
    AddressFormComponent,
    NavigationComponent,
    TableComponent,
    TodoListComponent,
    TreeComponent,
    ForbiddenComponent
  ]
})
export class NgleafModule { }
