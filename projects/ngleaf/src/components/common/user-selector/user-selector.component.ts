import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

import { LeafUserModel } from '../../../api/models/index';
import { UserAutocompleteService } from './user-autocomplete.service';

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
  public inputControler = new FormControl();
  public proposedUsers: Observable<LeafUserModel[]>;
  public disabled: boolean;

  @Input()
  public placeholder = 'Username';

  constructor(private userAutocomplete: UserAutocompleteService) {}

  ngOnInit() {
    this.inputControler.valueChanges.subscribe(
      value => this.onChanged(typeof value === 'object' && 'id' in value ? value : null)
    );
    this.proposedUsers = this.inputControler.valueChanges.pipe(
      startWith(''),
      switchMap(
        (inputValue) => inputValue.length >= 2 ? this.userAutocomplete.autocomplete(inputValue) : of([])
      )
    );
  }

  public displayProperty(value) {
    if (value) {
      return value.username;
    }
  }

  onChanged: any = () => {};
  onTouched: any = () => {};

  writeValue(val) {
    this.inputControler.setValue(val, {emitEvent: false});
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
