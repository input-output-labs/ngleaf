import {
  Component,
  forwardRef,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { 
  ControlValueAccessor, 
  NG_VALUE_ACCESSOR, 
  FormControl,
  Validators 
} from "@angular/forms";
import { MatFormFieldAppearance } from "@angular/material/form-field";
import { MatAutocompleteTrigger } from "@angular/material/autocomplete";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { map, startWith, takeUntil } from "rxjs/operators";

const CUSTOM_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => LeafIconInputComponent),
  multi: true,
};

@Component({
  selector: "leaf-icon-input",
  templateUrl: "./leaf-icon-input.component.html",
  styleUrls: ["./leaf-icon-input.component.scss"],
  providers: [CUSTOM_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeafIconInputComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input()
  public fieldAppearance: MatFormFieldAppearance = "fill";

  @Input()
  public placeholder: string = "Select an icon";

  @Input()
  public required: boolean = false;

  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger!: MatAutocompleteTrigger;

  public formControl = new FormControl('');
  public filteredOptions: Observable<string[]>;
  public selectedIcon: string = '';
  public isDisabled: boolean = false;

  private destroy$ = new Subject<void>();

  // Material Icons list (20 icons as requested)
  private readonly materialIcons: string[] = [
    'home',
    'search',
    'favorite',
    'star',
    'settings',
    'person',
    'email',
    'phone',
    'location_on',
    'shopping_cart',
    'add',
    'edit',
    'delete',
    'visibility',
    'visibility_off',
    'lock',
    'lock_open',
    'notifications',
    'menu',
    'close'
  ];

  // Form control callbacks
  private onChange = (_: string) => {};
  private onTouched = () => {};

  constructor() {
    this.filteredOptions = this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
      takeUntil(this.destroy$)
    );
  }

  ngOnInit(): void {
    this.formControl.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(value => {
      this.selectedIcon = value || '';
      this.onChange(value || '');
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.materialIcons.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  public onOptionSelected(option: string): void {
    this.formControl.setValue(option);
    this.selectedIcon = option;
    this.onChange(option);
    this.onTouched();
  }

  public onInputFocus(): void {
    this.onTouched();
  }

  public displayWith(value: string): string {
    return value || '';
  }

  public clearSelection(): void {
    this.formControl.setValue('');
    this.selectedIcon = '';
    this.onChange('');
    this.onTouched();
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.formControl.setValue(value || '', { emitEvent: false });
    this.selectedIcon = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    if (isDisabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }
}
