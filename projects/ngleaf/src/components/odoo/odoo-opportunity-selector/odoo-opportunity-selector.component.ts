import { Component, forwardRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, map, startWith, takeUntil } from 'rxjs/operators';
import { OdooApiClientService } from '../../../api/clients/odoo-api-client/odoo-api-client.service';
import { OdooOpportunity } from '../../../api/models/odoo/odoo.models';

@Component({
  selector: 'leaf-odoo-opportunity-selector',
  standalone: false,
  templateUrl: './odoo-opportunity-selector.component.html',
  styleUrls: ['./odoo-opportunity-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OdooOpportunitySelectorComponent),
      multi: true,
    },
  ],
})
export class OdooOpportunitySelectorComponent implements ControlValueAccessor, OnInit, OnDestroy {

  @Input() label = 'Opportunité Odoo';
  @Input() placeholder = 'Rechercher une opportunité...';
  @Input() limit = 200;

  @ViewChild(MatAutocompleteTrigger)
  private autocompleteTrigger?: MatAutocompleteTrigger;

  searchControl = new FormControl('');
  filteredOpportunities$: Observable<OdooOpportunity[]>;
  allOpportunities: OdooOpportunity[] = [];
  selectedOpportunity: OdooOpportunity | null = null;
  disabled = false;
  loading = false;

  private readonly opportunities$ = new BehaviorSubject<OdooOpportunity[]>([]);
  private destroy$ = new Subject<void>();
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private odooApiClient: OdooApiClientService) {}

  ngOnInit(): void {
    this.loading = true;
    this.odooApiClient.listOpportunities(this.limit).pipe(
      takeUntil(this.destroy$),
      catchError(() => of([]))
    ).subscribe(opportunities => {
      this.loading = false;
      this.allOpportunities = opportunities;
      this.opportunities$.next(opportunities);
      if (this.selectedOpportunity) {
        const match = opportunities.find(o => String(o.id) === String(this.selectedOpportunity?.id));
        if (match) {
          this.selectedOpportunity = match;
          this.searchControl.setValue(this.displayFn(match), { emitEvent: false });
        }
      }
    });

    this.filteredOpportunities$ = combineLatest([
      this.searchControl.valueChanges.pipe(startWith(this.searchControl.value ?? '')),
      this.opportunities$,
    ]).pipe(
      debounceTime(150),
      map(([value, opportunities]) => {
        if (typeof value !== 'string') {
          return opportunities;
        }
        return this.filterOpportunities(value, opportunities);
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

  private filterOpportunities(query: string, opportunities: OdooOpportunity[] = this.allOpportunities): OdooOpportunity[] {
    if (!query || query.trim().length === 0) {
      return opportunities;
    }
    const q = query.toLowerCase();
    return opportunities.filter(o =>
      (o.name || '').toLowerCase().includes(q) ||
      String(o.id || '').includes(q) ||
      (o.contactName || '').toLowerCase().includes(q) ||
      (o.email || '').toLowerCase().includes(q) ||
      (o.partnerName || '').toLowerCase().includes(q)
    );
  }

  displayFn = (opportunity: OdooOpportunity | string | null): string => {
    if (!opportunity) {
      return '';
    }
    if (typeof opportunity === 'string') {
      const match = this.allOpportunities.find(o => String(o.id) === opportunity);
      return match ? this.displayFn(match) : opportunity;
    }
    const name = opportunity.name || 'Opportunité';
    const idPart = opportunity.id != null ? ` (${opportunity.id})` : '';
    return `${name}${idPart}`;
  };

  getSubtitle(opportunity: OdooOpportunity): string {
    const parts: string[] = [];
    if (opportunity.contactName) {
      parts.push(opportunity.contactName);
    }
    if (opportunity.partnerName) {
      parts.push(opportunity.partnerName);
    }
    const email = this.getEmailDisplay(opportunity);
    if (email) {
      parts.push(email);
    }
    return parts.join(' · ');
  }

  getEmailDisplay(opportunity: OdooOpportunity): string {
    const raw = opportunity?.email;
    if (raw == null) {
      return '';
    }
    const value = String(raw).trim();
    if (!value || value.toLowerCase() === 'false' || value.toLowerCase() === 'null') {
      return '';
    }
    return value;
  }

  formatRevenue(opportunity: OdooOpportunity): string | null {
    if (opportunity.expectedRevenue == null) {
      return null;
    }
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(opportunity.expectedRevenue);
  }

  onOptionSelected(opportunity: OdooOpportunity): void {
    this.selectedOpportunity = opportunity;
    this.onChange(opportunity.id != null ? String(opportunity.id) : '');
    this.onTouched();
  }

  onBlur(): void {
    this.onTouched();
    const currentText = this.searchControl.value;
    if (typeof currentText === 'string' && this.selectedOpportunity) {
      const expected = this.displayFn(this.selectedOpportunity);
      if (currentText !== expected) {
        this.searchControl.setValue(expected, { emitEvent: false });
      }
    }
  }

  onClear(event: Event): void {
    event.stopPropagation();
    this.selectedOpportunity = null;
    this.searchControl.setValue('', { emitEvent: true });
    this.onChange('');
    this.onTouched();
  }

  writeValue(value: string): void {
    if (!value) {
      this.selectedOpportunity = null;
      this.searchControl.setValue('', { emitEvent: false });
      return;
    }
    const match = this.allOpportunities.find(o => String(o.id) === value);
    if (match) {
      this.selectedOpportunity = match;
      this.searchControl.setValue(this.displayFn(match), { emitEvent: false });
    } else {
      this.selectedOpportunity = {
        id: Number(value) || null,
        name: value,
        contactName: null,
        email: null,
        phone: null,
        expectedRevenue: null,
        partnerName: null,
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
