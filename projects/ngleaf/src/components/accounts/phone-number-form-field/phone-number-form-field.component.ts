import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, FormGroupDirective, NG_VALUE_ACCESSOR, NgForm, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ISO_3166_1_CODES } from './country-codes';
import { getExample, ParsedPhoneNumber, parsePhoneNumber } from 'awesome-phonenumber';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { map, ReplaySubject } from 'rxjs';

@Component({
  selector: 'leaf-phone-number-form-field',
  templateUrl: './phone-number-form-field.component.html',
  styleUrls: ['./phone-number-form-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: PhoneNumberFormFieldComponent
    }
  ]
})
export class PhoneNumberFormFieldComponent implements OnChanges, ControlValueAccessor {

  @Input()
  public countryCodes: string[] | null = null;
  private inputCountryCodes$: ReplaySubject<string[] | null> = new ReplaySubject<string[] | null>();
  public availableCountryCode$ = this.inputCountryCodes$.pipe(map((input) => {
    return ISO_3166_1_CODES.filter((existing) => !input || input.includes(existing.code));
  }));

  @Input()
  public appearance: MatFormFieldAppearance = "fill";

  @Input()
  public alignHorizontally = true;

  profileForm = this.fb.group({
    phone: this.fb.group({
      country: ['US'],
      number: ['']
    }, { validators: phoneValidator })
  });
  phoneErrorMatcher = new PhoneErrorMatcher();

  onChange = (phoneNumber) => {};

  onTouched = () => {};

  constructor(private fb: FormBuilder) {
    this.inputCountryCodes$.next(this.countryCodes);

    this.profileForm.valueChanges.subscribe(({phone}) => {
      const parsedPhoneNumber = parsePhoneNumber(phone.number, {regionCode: phone.country});
      if (parsedPhoneNumber.valid) {
        this.onChange(parsedPhoneNumber.number?.e164);
      }
    });
  }

  writeValue(phoneNumber: string): void {
    const parsedPhoneNumber = parsePhoneNumber(phoneNumber);
    if (parsedPhoneNumber.valid) {
      if (parsedPhoneNumber.number?.national) {
        this.phoneNumberControl.setValue(parsedPhoneNumber.number?.national);
      }
      this.phoneCountryControl.setValue(parsedPhoneNumber.regionCode);
    }
  }
  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }
  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }
  setDisabledState?(isDisabled: boolean): void {
    console.log("setDisabledState: ", isDisabled);
    if (isDisabled) {
      this.profileForm.disable();
    } else {
      this.profileForm.enable();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.countryCodes) {
      this.inputCountryCodes$.next(this.countryCodes);
    }
  }


  /**
   * Return a string containing only numeric values from the
   * phone.number form field.
   */
  get phoneNumberDigits(): string {
    return this.phoneNumberControl.value.replace(/\D/g, '');
  }

  /**
   * Return an {@see PhoneNumber} value created from the
   * phoneNumberDigits and currently selected country code.
   */
  get phoneNumber(): ParsedPhoneNumber {
    return parsePhoneNumber(this.phoneNumberDigits, {regionCode: this.phoneCountryControl.value});
  }

  /**
   * Formats the phone number digits using the 'national' format
   * from awesome-phonenumber.
   */
  formatNumber() {
    const natNum = this.phoneNumber.number?.national;
    this.phoneNumberControl.setValue((natNum) ? natNum : this.phoneNumberDigits);
  }

  /**
   * Generate a hint using the {@see PhoneNumber} getExample method
   * with the currently selected country.
   */
  get phoneHint(): string {
    return getExample(this.phoneCountryControl.value).number?.national;

  }

  /**
   * Get the [E.164]{@link https://en.wikipedia.org/wiki/E.164} formatted
   * phone number typically required by systems for making calls and
   * sending text messages.
   */
  get phoneE164(): string {
    return this.phoneNumber.number?.e164;
  }

  // FormControl Getters
  get phoneGroup() {
    return this.profileForm.get('phone') as FormControl;
  }

  get phoneCountryControl() {
    return this.profileForm.get('phone.country') as FormControl;
  }

  get phoneNumberControl() {
    return this.profileForm.get('phone.number') as FormControl;
  }

}

/**
 * Validates a FormGroup containing `country` and `number` fields that
 * are used to generate a {@see PhoneNumber}. Valid numbers are
 * determined by the PhoneNumber.isValid() method.
 */
export const phoneValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const country = control.get('country');
  const num = control.get('number');
  if (num?.value && country?.value && !(parsePhoneNumber(num.value, {regionCode: country.value}).valid)) {
    return { invalidPhone: true };
  } else {
    return null;
  }
};

/**
 * {@see ErrorStateMatcher} used to update the error state of the
 * phone number when the country or phone number changes.
 */
export class PhoneErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control.value && control.touched && !control?.parent?.valid);
  }
}
