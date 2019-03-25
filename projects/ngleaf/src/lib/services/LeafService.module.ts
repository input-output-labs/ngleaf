import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LeafNotificationService } from './LeafNotification.service';
import { LeafSessionService } from './LeafSession.service';
import { LeafUploadFileService } from './LeafUploadFile.service';
import { LeafAdminService } from './LeafAdmin.service';
import { LeafAuthHttpClient, applicationHttpClientCreator } from './LeafAuthHttpClient.service';
import { HttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [LeafNotificationService, LeafSessionService, LeafAdminService, LeafUploadFileService,
    {
      provide: LeafAuthHttpClient,
      useFactory: applicationHttpClientCreator,
      deps: [HttpClient]
  }],
  exports: []
})
export class LeafServiceModule {
}
