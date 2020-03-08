import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountPopoverContentComponent,
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
  RegisterPageComponent} from './components';
import { AddressFormComponent } from './components/templates/address-form/address-form.component';
import { NavigationComponent } from './components/templates/navigation/navigation.component';
import { TableComponent } from './components/templates/table/table.component';
import { TodoListComponent } from './components/templates/todo-list/todo-list.component';
import { TreeComponent } from './components/templates/tree/tree.component';
import { LeafNotificationService, LeafSessionService, LeafAdminService, LeafUploadFileService } from './services';
import { LeafAuthHttpClient, applicationHttpClientCreator } from './services/leaf-auth-http-client.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
import { LeafAccountSettingsPageRouteModule } from './components/pages/account-settings/account-settings-page.route';
import { LeafAdminSettingsPageRouteModule } from './components/pages/admin-settings/admin-settings-page.route';
import { ForbiddenComponent } from './components/pages/forbidden/forbidden.component';

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
  providers: [
    LeafNotificationService,
    LeafSessionService,
    LeafAdminService,
    LeafUploadFileService,
    {
      provide: LeafAuthHttpClient,
      useFactory: applicationHttpClientCreator,
      deps: [HttpClient],
    },
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
    MatNativeDateModule,
    /* Routes */
    LeafAccountSettingsPageRouteModule,
    LeafAdminSettingsPageRouteModule,
  ],
  exports: [
    AccountPopoverContentComponent,
    HeaderAccountComponent,
    ImageUploadComponent,
    LoginComponent,
    RegisterComponent,
    AccountSettingsPageComponent,
    AdminSettingsPageComponent,
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
