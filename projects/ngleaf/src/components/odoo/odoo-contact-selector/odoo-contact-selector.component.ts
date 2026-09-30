import { Component, forwardRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { BehaviorSubject, EMPTY, Observable, of, Subject } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  shareReplay,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
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

  private static readonly MIN_SEARCH_LENGTH = 2;
  private static readonly SEARCH_RESULT_LIMIT = 40;

  @Input() label = 'Contact Odoo';
  @Input() placeholder = 'Rechercher un contact...';
  @Input() limit = 200;

  @ViewChild(MatAutocompleteTrigger)
  private autocompleteTrigger?: MatAutocompleteTrigger;

  searchControl = new FormControl('');
  filteredContacts$ = new BehaviorSubject<OdooContact[]>([]);
  allContacts: OdooContact[] = [];
  selectedContact: OdooContact | null = null;
  disabled = false;
  loading = false;
  currentQuery = '';

  private defaultContacts: OdooContact[] | null = null;
  private defaultContactsRequest: Observable<OdooContact[]> | null = null;
  private requestSeq = 0;
  private destroy$ = new Subject<void>();
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private odooApiClient: OdooApiClientService) {}

  get loadingLabel(): string {
    return this.currentQuery.length >= OdooContactSelectorComponent.MIN_SEARCH_LENGTH
      ? 'Recherche...'
      : 'Chargement des contacts...';
  }

  get emptyLabel(): string {
    return this.currentQuery.length > 0 && this.currentQuery.length < OdooContactSelectorComponent.MIN_SEARCH_LENGTH
      ? 'Saisissez au moins 2 caractères'
      : 'Aucun contact trouvé';
  }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      startWith(this.searchControl.value ?? ''),
      map(value => this.toSearchQuery(value)),
      debounceTime(250),
      distinctUntilChanged(),
      switchMap(query => this.resolveContacts(query)),
      takeUntil(this.destroy$),
    ).subscribe(contacts => {
      this.allContacts = contacts;
      this.filteredContacts$.next(contacts);
      this.syncSelectedContact(contacts);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onInputFocus(): void {
    queueMicrotask(() => this.autocompleteTrigger?.openPanel());
  }

  private toSearchQuery(value: unknown): string | null {
    if (typeof value !== 'string') {
      return null;
    }
    return value.trim();
  }

  private resolveContacts(query: string | null): Observable<OdooContact[]> {
    if (query === null) {
      return EMPTY;
    }
    this.currentQuery = query;
    if (query.length < OdooContactSelectorComponent.MIN_SEARCH_LENGTH) {
      return this.ensureDefaultContacts().pipe(
        map(contacts => this.filterContacts(query, contacts)),
      );
    }

    const requestId = ++this.requestSeq;
    this.loading = true;
    this.filteredContacts$.next([]);
    return this.odooApiClient.listContacts(OdooContactSelectorComponent.SEARCH_RESULT_LIMIT, query).pipe(
      catchError(() => of([] as OdooContact[])),
      finalize(() => {
        if (requestId === this.requestSeq) {
          this.loading = false;
        }
      }),
    );
  }

  private ensureDefaultContacts(): Observable<OdooContact[]> {
    if (this.defaultContacts) {
      this.loading = false;
      return of(this.defaultContacts);
    }
    this.loading = true;
    if (!this.defaultContactsRequest) {
      this.defaultContactsRequest = this.odooApiClient.listContacts(this.limit).pipe(
        tap(contacts => {
          this.defaultContacts = contacts;
        }),
        catchError(() => {
          this.defaultContactsRequest = null;
          return of([] as OdooContact[]);
        }),
        shareReplay({ bufferSize: 1, refCount: false }),
      );
    }
    return this.defaultContactsRequest.pipe(
      finalize(() => {
        this.loading = false;
      }),
    );
  }

  private syncSelectedContact(contacts: OdooContact[]): void {
    if (!this.selectedContact) {
      return;
    }
    const match = contacts.find(contact => String(contact.id) === String(this.selectedContact?.id));
    if (!match) {
      return;
    }
    const currentValue = this.searchControl.value;
    const canReplace =
      currentValue == null ||
      currentValue === '' ||
      currentValue === String(match.id) ||
      currentValue === this.selectedContact.name;
    this.selectedContact = match;
    if (canReplace) {
      this.searchControl.setValue(this.displayFn(match), { emitEvent: false });
    }
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
      (c.phone || '').toLowerCase().includes(q) ||
      (c.mobile || '').toLowerCase().includes(q) ||
      (c.companyName || '').toLowerCase().includes(q)
    );
  }

  displayFn = (contact: OdooContact | string | null): string => {
    if (!contact) {
      return '';
    }
    if (typeof contact === 'string') {
      const match = this.findKnownContact(contact);
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

  getCompanyDisplay(contact: OdooContact): string {
    const raw = contact?.companyName;
    if (raw == null) {
      return '';
    }
    const value = String(raw).trim();
    if (!value || value.toLowerCase() === 'false' || value.toLowerCase() === 'null') {
      return '';
    }
    return value;
  }

  private findKnownContact(id: string): OdooContact | undefined {
    return [...this.allContacts, ...(this.defaultContacts ?? [])].find(contact => String(contact.id) === id);
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
        this.currentQuery = '';
        this.searchControl.setValue(expected, { emitEvent: false });
        if (this.defaultContacts) {
          this.allContacts = this.defaultContacts;
          this.filteredContacts$.next(this.defaultContacts);
        }
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
    const match = this.findKnownContact(value);
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
