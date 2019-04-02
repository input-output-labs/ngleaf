import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { LeafUploadFileService } from '../../../services/LeafUploadFile.service';

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
  onSelectFile: EventEmitter<any> = new EventEmitter();

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

      this.onSelectFile.emit(this.imageUrl);
    });

    this.selectedFiles = undefined
  }
}
