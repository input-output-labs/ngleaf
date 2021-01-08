import { NgModule } from '@angular/core';
import { LeafNotificationModule } from '../core/notification/leaf-notification.module';
import { LeafUploadFileService } from './leaf-upload-file.service';

@NgModule({
    imports: [LeafNotificationModule],
    providers: [LeafUploadFileService]
})
export class LeafUploadFileModule {}
