import { Component, EventEmitter, OnInit, Output, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { LeafUploadFileService } from '../../../services/index';

const CUSTOM_VALUE_ACCESSOR: any = {
  provide : NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => LeafImageUploadComponent),
  multi : true,
};

@Component({
  selector: 'leaf-image-upload',
  templateUrl: './imageUpload.component.html',
  styleUrls: ['./imageUpload.component.scss'],
  providers : [CUSTOM_VALUE_ACCESSOR],
})
export class LeafImageUploadComponent implements OnInit, ControlValueAccessor {
  selectedFiles: FileList;
  currentFileUpload: Blob;
  public imageUrl: string;

  @Input()
  public color: string = '#1fb264';

  @Input()
  public resizeWidth?: number;

  @Input()
  public resizeHeight?: number;

  @Input()
  public compressionRate: number = 1; // 1 means better quality, 0 is the lowest quality possible

  @Input()
  public imageFormat: string = 'webp'; 

  @Output()
  public selectedFile: EventEmitter<any> = new EventEmitter();

  @Output()
  public onError: EventEmitter<void> =new EventEmitter();

  public hover = false;

  public fileUploadInProgress = false;

  // Form control field
  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor(private uploadService: LeafUploadFileService) {}

  ngOnInit() {}

  writeValue(obj: any): void {
    this.imageUrl = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {}

  public selectFile(event) {
    this.selectedFiles = event.target.files;

    const that = this;

    if (this.selectedFiles && this.selectedFiles[0]) {
      const file = this.selectedFiles[0];
      const reader = new FileReader();

      var img = document.createElement("img");

      reader.onload = (e: any) => {
        const image = e.target.result;
        console.log(image);
        img.src = image;
        that.imageUrl = image;

        if (this.resizeWidth && this.resizeHeight) {
          img.addEventListener('load', function () {
            var canvas = document.createElement("canvas");

            var width = img.width;
            var height = img.height;

            if (width > that.resizeWidth) {
              width = that.resizeWidth;
            }

            if (height > that.resizeHeight) {
              height = that.resizeHeight;
            }

            canvas.width = width;
            canvas.height = height;

            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);

            var adjustedCompressionRate = that.compressionRate; 
            adjustedCompressionRate = Math.max(0, Math.min(1, adjustedCompressionRate));

            var adjustedImageFormat = that.imageFormat;
            adjustedImageFormat = adjustedImageFormat.toLowerCase();

            var dataurl = canvas.toDataURL(`image/${adjustedImageFormat}`, adjustedCompressionRate);

            that.imageUrl = dataurl;

            that.upload();
          });
        } else {
          that.upload();
        }
      };
      reader.readAsDataURL(file);
    }
  }

  public dataURItoBlob(dataURI): Blob {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    // create a view into the buffer
    var ia = new Uint8Array(ab);
    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], {type: mimeString});
    return blob;
  }

  public upload() {
    this.currentFileUpload = this.dataURItoBlob(this.imageUrl);
    this.fileUploadInProgress = true;
    this.uploadService
      .pushFileToStorage(this.currentFileUpload)
      .subscribe(imageUrl => {
        this.imageUrl = imageUrl;
        this.onChange(this.imageUrl);
        this.selectedFile.emit(this.imageUrl);
        this.fileUploadInProgress = false;
      }, (error) => {
        this.onError.emit(error);
        this.fileUploadInProgress = false;
      });

    this.onTouched();
    this.selectedFiles = undefined;
  }
}
