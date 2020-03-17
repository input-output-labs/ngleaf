import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule,
  MatDividerModule,
  MatButtonModule,
  MatInputModule,
  MatListModule,
  MatCardModule,
  MatFormFieldModule,
  MatOptionModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule,
  MatPaginatorModule,
  MatTableModule,
  MatSortModule,
  MatTreeModule,
  MatDatepickerModule,
  MatNativeDateModule} from '@angular/material';
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
