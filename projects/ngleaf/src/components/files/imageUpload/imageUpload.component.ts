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
  currentFileUpload: File;
  public imageUrl: string;

  @Input()
  public color: string = '#1fb264';

  @Output()
  public selectedFile: EventEmitter<any> = new EventEmitter();

  public hover = false;

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
    this.upload();
  }

  public upload() {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService
      .pushFileToStorage(this.currentFileUpload)
      .subscribe(imageUrl => {
        this.imageUrl = imageUrl;
        this.onChange(this.imageUrl);
        this.selectedFile.emit(this.imageUrl);
      });

    this.onTouched();
    this.selectedFiles = undefined;
  }
}
