import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { LeafUploadFileService } from '../../../services/leaf-upload-file.service';

@Component({
  selector: 'leaf-image-upload',
  templateUrl: './imageUpload.component.html',
  styleUrls: ['./imageUpload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: File;
  public imageUrl: string;

  @Output()
  selectedFile: EventEmitter<any> = new EventEmitter(); // TODO: REMOVE ANY

  constructor(private uploadService: LeafUploadFileService) {
  }

  ngOnInit() {
  }

  public selectFile(event) {
    this.selectedFiles = event.target.files;
    this.upload();
  }

  public upload() {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(imageUrl => {
      this.imageUrl = imageUrl;

      this.selectedFile.emit(this.imageUrl);
    });

    this.selectedFiles = undefined;
  }
}
