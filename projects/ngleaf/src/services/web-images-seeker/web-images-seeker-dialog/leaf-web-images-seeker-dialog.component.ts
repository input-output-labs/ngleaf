import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { LeafWebImagesSeekerService } from '../leaf-web-images-seeker.service';

interface Data {
  prefill: string;
}

@Component({
  templateUrl: './leaf-web-images-seeker-dialog.component.html',
  styleUrls: ['./leaf-web-images-seeker-dialog.component.scss']
})
export class LeafWebImagesSeekerDialogComponent {

  public results$: Observable<string[]>;
  public selectedImageIndex = -1;
  public inputFormControl: FormControl = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<LeafWebImagesSeekerDialogComponent>,
    private leafWebImagesSeekerService: LeafWebImagesSeekerService,
    @Inject(MAT_DIALOG_DATA) public data: Data
  ) {
    this.inputFormControl.valueChanges.subscribe(
      (searchValue) => {
        this.results$ = this.leafWebImagesSeekerService.searchImages(searchValue);
      }
    );

    this.inputFormControl.setValue(data.prefill);
  }

  selectImage(index: number) {
    this.selectedImageIndex = this.selectedImageIndex === index ? -1 : index;
  }

  validate(): void {
    this.results$.pipe(take(1)).subscribe(results => {
      this.dialogRef.close(results[this.selectedImageIndex]);
    });
  }

  cancel(): void {
    this.dialogRef.close(undefined);
  }

}
