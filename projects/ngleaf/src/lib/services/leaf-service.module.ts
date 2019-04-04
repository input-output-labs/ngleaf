import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LeafNotificationService } from './leaf-notification.service';
import { LeafSessionService } from './leaf-session.service';
import { LeafUploadFileService } from './leaf-upload-file.service';
import { LeafAdminService } from './leaf-admin.service';
import {
  LeafAuthHttpClient,
  applicationHttpClientCreator,
} from './leaf-auth-http-client.service';
import { HttpClient } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
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
  exports: [],
})
export class LeafServiceModule {}
