import { Component, forwardRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, map, startWith, takeUntil } from 'rxjs/operators';
import { OdooApiClientService } from '../../../api/clients/odoo-api-client/odoo-api-client.service';
import { OdooProduct } from '../../../api/models/odoo/odoo.models';

@Component({
  selector: 'leaf-odoo-product-selector',
  standalone: false,
  templateUrl: './odoo-product-selector.component.html',
  styleUrls: ['./odoo-product-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OdooProductSelectorComponent),
      multi: true,
    },
  ],
})
export class OdooProductSelectorComponent implements ControlValueAccessor, OnInit, OnDestroy {

  @Input() label = 'Produit Odoo';
  @Input() placeholder = 'Rechercher un produit...';
  @Input() limit = 200;

  @ViewChild(MatAutocompleteTrigger)
  private autocompleteTrigger?: MatAutocompleteTrigger;

  searchControl = new FormControl('');
  filteredProducts$: Observable<OdooProduct[]>;
  allProducts: OdooProduct[] = [];
  selectedProduct: OdooProduct | null = null;
  disabled = false;
  loading = false;

  private readonly products$ = new BehaviorSubject<OdooProduct[]>([]);
  private readonly brokenImageIds = new Set<string>();
  private destroy$ = new Subject<void>();
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private odooApiClient: OdooApiClientService) {}

  ngOnInit(): void {
    this.loading = true;
    this.odooApiClient.listProducts(this.limit).pipe(
      takeUntil(this.destroy$),
      catchError(() => of([]))
    ).subscribe(products => {
      this.loading = false;
      this.allProducts = products;
      this.products$.next(products);
      if (this.selectedProduct) {
        const match = products.find(p => String(p.id) === String(this.selectedProduct?.id));
        if (match) {
          this.selectedProduct = match;
          this.searchControl.setValue(this.displayFn(match), { emitEvent: false });
        }
      }
    });

    this.filteredProducts$ = combineLatest([
      this.searchControl.valueChanges.pipe(startWith(this.searchControl.value ?? '')),
      this.products$,
    ]).pipe(
      debounceTime(150),
      map(([value, products]) => {
        if (typeof value !== 'string') {
          return products;
        }
        return this.filterProducts(value, products);
      }),
      takeUntil(this.destroy$),
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onInputFocus(): void {
    queueMicrotask(() => this.autocompleteTrigger?.openPanel());
  }

  private filterProducts(query: string, products: OdooProduct[] = this.allProducts): OdooProduct[] {
    if (!query || query.trim().length === 0) {
      return products;
    }
    const q = query.toLowerCase();
    return products.filter(p =>
      (p.name || '').toLowerCase().includes(q) ||
      String(p.id || '').includes(q) ||
      (p.defaultCode || '').toLowerCase().includes(q)
    );
  }

  displayFn = (product: OdooProduct | string | null): string => {
    if (!product) {
      return '';
    }
    if (typeof product === 'string') {
      const match = this.allProducts.find(p => String(p.id) === product);
      return match ? this.displayFn(match) : product;
    }
    const name = product.name || 'Produit';
    const idPart = product.id != null ? ` (${product.id})` : '';
    return `${name}${idPart}`;
  };

  getSubtitle(product: OdooProduct): string {
    const parts: string[] = [];
    if (product.defaultCode) {
      parts.push(product.defaultCode);
    }
    const price = this.formatPrice(product);
    if (price) {
      parts.push(price);
    }
    return parts.join(' · ');
  }

  formatPrice(product: OdooProduct): string | null {
    if (product.standardPrice == null) {
      return null;
    }
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(product.standardPrice);
  }

  hasDisplayableImage(product: OdooProduct | null): boolean {
    return !!product?.imageUrl && !this.isImageBroken(product);
  }

  isImageBroken(product: OdooProduct | null): boolean {
    if (!product?.id) {
      return false;
    }
    return this.brokenImageIds.has(String(product.id));
  }

  onImageError(product: OdooProduct | null, event: Event): void {
    event.stopPropagation();
    if (product?.id != null) {
      this.brokenImageIds.add(String(product.id));
    }
  }

  onOptionSelected(product: OdooProduct): void {
    this.selectedProduct = product;
    this.onChange(product.id != null ? String(product.id) : '');
    this.onTouched();
  }

  onBlur(): void {
    this.onTouched();
    const currentText = this.searchControl.value;
    if (typeof currentText === 'string' && this.selectedProduct) {
      const expected = this.displayFn(this.selectedProduct);
      if (currentText !== expected) {
        this.searchControl.setValue(expected, { emitEvent: false });
      }
    }
  }

  onClear(event: Event): void {
    event.stopPropagation();
    this.selectedProduct = null;
    this.searchControl.setValue('', { emitEvent: true });
    this.onChange('');
    this.onTouched();
  }

  writeValue(value: string): void {
    if (!value) {
      this.selectedProduct = null;
      this.searchControl.setValue('', { emitEvent: false });
      return;
    }
    const match = this.allProducts.find(p => String(p.id) === value);
    if (match) {
      this.selectedProduct = match;
      this.searchControl.setValue(this.displayFn(match), { emitEvent: false });
    } else {
      this.selectedProduct = {
        id: Number(value) || null,
        name: value,
        defaultCode: null,
        standardPrice: null,
        imageUrl: null,
      };
      this.searchControl.setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (isDisabled) {
      this.searchControl.disable({ emitEvent: false });
    } else {
      this.searchControl.enable({ emitEvent: false });
    }
  }
}
