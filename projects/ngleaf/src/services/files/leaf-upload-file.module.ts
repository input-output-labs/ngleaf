import { NgModule } from '@angular/core';
import { LeafNotificationModule } from '../core';
import { LeafUploadFileService } from './leaf-upload-file.service';

@NgModule({
    imports: [LeafNotificationModule],
    providers: [LeafUploadFileService]
})
export class LeafUploadFileModule {}
