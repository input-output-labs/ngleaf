import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationsApiClientService } from './organizations-api-client.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [OrganizationsApiClientService]
})
export class OrganizationsApiClientModule { }
