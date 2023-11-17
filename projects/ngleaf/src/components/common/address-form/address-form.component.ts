import {
  Component,
  forwardRef,
  ChangeDetectionStrategy,
  Input,
} from "@angular/core";
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR, UntypedFormGroup, Validators } from "@angular/forms";
import { LeafAddress } from "../../../api/models/leaf-account.model";
import { MatFormFieldAppearance } from "@angular/material/form-field";

const CUSTOM_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => LeafAddressFormComponent),
  multi: true,
};

@Component({
  selector: "leaf-address-form",
  templateUrl: "./address-form.component.html",
  styleUrls: ["./address-form.component.scss"],
  providers: [CUSTOM_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeafAddressFormComponent implements ControlValueAccessor {

  @Input()
  public fieldAppearance: MatFormFieldAppearance = "fill";

  // Form control field
  private onChange = (_: any) => {};
  private onTouched = () => {};

  public addressFormGroup: UntypedFormGroup;

  constructor(fb: FormBuilder) {
    this.addressFormGroup = fb.group({
      address: ['', Validators.required],
      postalCode: ['', Validators.required],
      city: ['', Validators.required],
    });
    this.addressFormGroup.valueChanges.subscribe((newValue) => {
      this.onChange(newValue);
    });
  }

  writeValue(address: LeafAddress): void {
    this.addressFormGroup.setValue({
      address: address?.address ?? '',
      postalCode: address?.postalCode ?? '',
      city: address?.city ?? '',
    }, {emitEvent: false});
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
