import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeafRedirectionCreationBatch, LeafRedirectionCreationBatchCreation, RedirectionApiClientService } from '../../../api';
import { map, Observable, shareReplay, startWith } from 'rxjs';

@Component({
  standalone: false,
  selector: 'leaf-redirection-creation-batch-form',
  templateUrl: './leaf-redirection-creation-batch-form.component.html',
  styleUrls: ['./leaf-redirection-creation-batch-form.component.scss']
})
export class LeafRedirectionCreationBatchFormComponent {

  public redirectionCreationBatchFormGroup: FormGroup;

  public creationPending$: Observable<boolean>;

  @Input()
  public inline: boolean = true;

  @Output()
  public redirectionCreationBatchCreated: EventEmitter<LeafRedirectionCreationBatch> = new EventEmitter<LeafRedirectionCreationBatch>();

  constructor(private redirectionApiClient: RedirectionApiClientService, fb: FormBuilder) {
    this.redirectionCreationBatchFormGroup = fb.group({
      size: [10, [Validators.required, Validators.min(1)]],
      comment: ["", [Validators.required, Validators.minLength(8)]]
    });
  }

  public submit() {
    this.redirectionCreationBatchFormGroup.updateValueAndValidity();
    if (this.redirectionCreationBatchFormGroup.valid) {
      const batch: LeafRedirectionCreationBatchCreation = this.redirectionCreationBatchFormGroup.getRawValue();

      const createRedirectBatchCall$ = this.redirectionApiClient.createRedirects(batch).pipe(
        shareReplay({ refCount: true, bufferSize: 1 })
      );
      this.creationPending$ = createRedirectBatchCall$.pipe(
        map(c => !c),
        startWith(true)
      );
      createRedirectBatchCall$.subscribe((redirectionCreationBatch) => {
        this.redirectionCreationBatchCreated.emit(redirectionCreationBatch);
      });
    }
  }
}
