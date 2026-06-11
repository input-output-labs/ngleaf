import { Component, forwardRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, map, startWith, takeUntil } from 'rxjs/operators';
import { OdooApiClientService } from '../../../api/clients/odoo-api-client/odoo-api-client.service';
import { OdooContact } from '../../../api/models/odoo/odoo.models';

@Component({
  selector: 'leaf-odoo-contact-selector',
  standalone: false,
  templateUrl: './odoo-contact-selector.component.html',
  styleUrls: ['./odoo-contact-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OdooContactSelectorComponent),
      multi: true,
    },
  ],
})
export class OdooContactSelectorComponent implements ControlValueAccessor, OnInit, OnDestroy {

  @Input() label = 'Contact Odoo';
  @Input() placeholder = 'Rechercher un contact...';
  @Input() limit = 200;

  @ViewChild(MatAutocompleteTrigger)
  private autocompleteTrigger?: MatAutocompleteTrigger;

  searchControl = new FormControl('');
  filteredContacts$: Observable<OdooContact[]>;
  allContacts: OdooContact[] = [];
  selectedContact: OdooContact | null = null;
  disabled = false;
  loading = false;

  private readonly contacts$ = new BehaviorSubject<OdooContact[]>([]);
  private destroy$ = new Subject<void>();
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private odooApiClient: OdooApiClientService) {}

  ngOnInit(): void {
    this.loading = true;
    this.odooApiClient.listContacts(this.limit).pipe(
      takeUntil(this.destroy$),
      catchError(() => of([]))
    ).subscribe(contacts => {
      this.loading = false;
      this.allContacts = contacts;
      this.contacts$.next(contacts);
      if (this.selectedContact) {
        const match = contacts.find(c => String(c.id) === String(this.selectedContact?.id));
        if (match) {
          this.selectedContact = match;
          this.searchControl.setValue(this.displayFn(match), { emitEvent: false });
        }
      }
    });

    this.filteredContacts$ = combineLatest([
      this.searchControl.valueChanges.pipe(startWith(this.searchControl.value ?? '')),
      this.contacts$,
    ]).pipe(
      debounceTime(150),
      map(([value, contacts]) => {
        if (typeof value !== 'string') {
          return contacts;
        }
        return this.filterContacts(value, contacts);
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

  private filterContacts(query: string, contacts: OdooContact[] = this.allContacts): OdooContact[] {
    if (!query || query.trim().length === 0) {
      return contacts;
    }
    const q = query.toLowerCase();
    return contacts.filter(c =>
      (c.name || '').toLowerCase().includes(q) ||
      String(c.id || '').includes(q) ||
      (c.email || '').toLowerCase().includes(q) ||
      (c.companyName || '').toLowerCase().includes(q)
    );
  }

  displayFn = (contact: OdooContact | string | null): string => {
    if (!contact) {
      return '';
    }
    if (typeof contact === 'string') {
      const match = this.allContacts.find(c => String(c.id) === contact);
      return match ? this.displayFn(match) : contact;
    }
    const name = contact.name || 'Contact';
    const idPart = contact.id != null ? ` (${contact.id})` : '';
    return `${name}${idPart}`;
  };

  getEmailDisplay(contact: OdooContact): string {
    const raw = contact?.email;
    if (raw == null) {
      return '';
    }
    const value = String(raw).trim();
    if (!value || value.toLowerCase() === 'false' || value.toLowerCase() === 'null') {
      return '';
    }
    return value;
  }

  isEmailMissing(contact: OdooContact): boolean {
    return this.getEmailDisplay(contact).length === 0;
  }

  onOptionSelected(contact: OdooContact): void {
    this.selectedContact = contact;
    this.onChange(contact.id != null ? String(contact.id) : '');
    this.onTouched();
  }

  onBlur(): void {
    this.onTouched();
    const currentText = this.searchControl.value;
    if (typeof currentText === 'string' && this.selectedContact) {
      const expected = this.displayFn(this.selectedContact);
      if (currentText !== expected) {
        this.searchControl.setValue(expected, { emitEvent: false });
      }
    }
  }

  onClear(event: Event): void {
    event.stopPropagation();
    this.selectedContact = null;
    this.searchControl.setValue('', { emitEvent: true });
    this.onChange('');
    this.onTouched();
  }

  writeValue(value: string): void {
    if (!value) {
      this.selectedContact = null;
      this.searchControl.setValue('', { emitEvent: false });
      return;
    }
    const match = this.allContacts.find(c => String(c.id) === value);
    if (match) {
      this.selectedContact = match;
      this.searchControl.setValue(this.displayFn(match), { emitEvent: false });
    } else {
      this.selectedContact = {
        id: Number(value) || null,
        name: value,
        email: null,
        phone: null,
        mobile: null,
        companyName: null,
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
