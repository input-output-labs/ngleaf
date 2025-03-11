import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, Observable, take } from 'rxjs';

import { LeafAccountModel } from '../../../api/models/index';
import { selectCurrentAccountData, selectSendEmailVerificationCode, selectValidateEmailVerificationCode } from '../../../store/core/session/session.selectors';
import { sendEmailVerificationCode, validateEmailVerificationCode } from '../../../store/core/session/session.actions';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

export type LeafEmailVerificationState = "SendCode" | "Validation";

@Component({
  selector: 'leaf-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent {
  public currentAccount$: Observable<LeafAccountModel>;
  
  @Input()
  public submitTrigger$?: Observable<void>;

  @Output()
  public onSendEmailVerificationCodeSuccess: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public onSendEmailVerificationCodeError: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public onValidateEmailVerificationCodeSuccess: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public onValidateEmailVerificationCodeError: EventEmitter<void> = new EventEmitter<void>();

  public codeFormControl = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]);
  
  public state: LeafEmailVerificationState = "SendCode";

  constructor(private store: Store) {
    this.currentAccount$ = this.store.select(selectCurrentAccountData);
  }

  public doSendEmailVerificationCode() {
    this.store.dispatch(sendEmailVerificationCode());

    this.store.pipe(
      select(selectSendEmailVerificationCode),
      filter((state) => !state.status.pending),
      take(1)
    ).subscribe((state) => {
      if (state.status.success) {
        this.state = "Validation";
        this.onSendEmailVerificationCodeSuccess.emit();
      } else {
        this.onSendEmailVerificationCodeError.emit();
      }
    });
  }

  public doValidateEmailVerificationCode() {
    if (this.codeFormControl.valid) {
      this.store.dispatch(validateEmailVerificationCode({code: this.codeFormControl.value}));
  
      this.store.pipe(
        select(selectValidateEmailVerificationCode),
        filter((state) => !state.status.pending),
        take(1)
      ).subscribe((state) => {
        if (state.status.success) {
          this.onValidateEmailVerificationCodeSuccess.emit();
        } else {
          this.onValidateEmailVerificationCodeError.emit();
        }
      });
    }
  }
}
