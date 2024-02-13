import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, UntypedFormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

import { LeafAccountModel, AccountApiClient } from '../../../api/index';

@Component({
  selector: 'leaf-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserSelectorComponent),
      multi: true
    }
  ]
})
export class UserSelectorComponent implements OnInit, ControlValueAccessor {
  separatorKeysCodes: number[] = [ENTER, COMMA];

  public inputControler = new UntypedFormControl();
  public proposedUsers$: Observable<LeafAccountModel[]>;
  public disabled: boolean;

  users: string[] = [];

  @Input()
  public placeholder = 'Username';

  @Input()
  public multiple: boolean = false;

  @ViewChild('userInput') userInput: ElementRef<HTMLInputElement>;

  constructor(private accountApi: AccountApiClient) {}

  ngOnInit() {
    this.proposedUsers$ = this.inputControler.valueChanges.pipe(
      startWith(''),
      switchMap(
        (inputValue) => inputValue && inputValue.length >= 2 ? this.accountApi.autocomplete(inputValue) : of([])
      )
    );
  }

  emitChange() {
    if (this.multiple) {
      this.onChanged(this.users);
    } else {
      this.onChanged(this.users && this.users[0]);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our user
    if (value) {
      this.users.push(value);
      this.emitChange();
    }

    // Clear the input value
    event.chipInput!.clear();

    this.inputControler.setValue(null);
  }

  remove(user: string): void {
    const index = this.users.indexOf(user);

    if (index >= 0) {
      this.users.splice(index, 1);
      this.emitChange();
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.users.push(event.option.value);
    this.emitChange();
    this.userInput.nativeElement.value = this.multiple ? '' : event.option.value.profile.username;
    this.inputControler.setValue(null);
  }

  public displayProperty(value) {
    if (value) {
      return value.username;
    }
  }

  onChanged: any = () => {};
  onTouched: any = () => {};

  writeValue(val) {
    if (this.multiple) {
      this.users = val;
    } else {
      this.inputControler.setValue(val, {emitEvent: false});
    }
  }

  registerOnChange(fn: any) {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
