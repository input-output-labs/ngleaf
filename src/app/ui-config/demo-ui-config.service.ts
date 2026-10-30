import { Inject, Injectable } from '@angular/core';
import { LeafConfig, LeafConfigServiceToken, LeafMatFieldCustomization } from '@input-output-labs/ngleaf';
import { Observable, Subject } from 'rxjs';

const STORAGE_KEY = 'leaf-demo-ui-material';

export interface DemoMatFieldDraft {
  appearance: '' | 'fill' | 'outline';
  subscriptSizing: '' | 'fixed' | 'dynamic';
  floatLabel: '' | 'always' | 'auto';
  extraClass: string;
}

@Injectable({ providedIn: 'root' })
export class DemoUiConfigService {
  private readonly changesSubject = new Subject<void>();
  readonly changes$: Observable<void> = this.changesSubject.asObservable();
  private readonly baseline: DemoMatFieldDraft;

  constructor(@Inject(LeafConfigServiceToken) private config: LeafConfig) {
    this.baseline = this.readCurrent();
    const stored = this.readStored();
    if (stored) {
      this.write(stored, false);
    }
  }

  current(): DemoMatFieldDraft {
    return this.readCurrent();
  }

  apply(draft: DemoMatFieldDraft): void {
    this.write(draft, true);
  }

  reset(): DemoMatFieldDraft {
    localStorage.removeItem(STORAGE_KEY);
    this.write(this.baseline, false);
    return this.readCurrent();
  }

  private write(draft: DemoMatFieldDraft, persist: boolean): void {
    const field = this.ensureMatField();
    this.assign(field, 'appearance', draft.appearance);
    this.assign(field, 'subscriptSizing', draft.subscriptSizing);
    this.assign(field, 'floatLabel', draft.floatLabel);
    field.extraClass = draft.extraClass.trim();
    if (persist) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.readCurrent()));
    }
    this.changesSubject.next();
  }

  private ensureMatField(): LeafMatFieldCustomization {
    const ui = this.config.uiCustomization ?? {
      dialogWidth: { small: '400px', medium: '600px', large: '800px' },
    };
    this.config.uiCustomization = ui;
    ui.material ??= {};
    ui.material['mat-field'] ??= {};
    return ui.material['mat-field'];
  }

  private assign<K extends 'appearance' | 'subscriptSizing' | 'floatLabel'>(
    field: LeafMatFieldCustomization,
    key: K,
    value: LeafMatFieldCustomization[K] | '',
  ): void {
    if (value) {
      field[key] = value;
    } else {
      delete field[key];
    }
  }

  private readCurrent(): DemoMatFieldDraft {
    const field = this.config.uiCustomization?.material?.['mat-field'];
    return {
      appearance: field?.appearance === 'fill' || field?.appearance === 'outline' ? field.appearance : '',
      subscriptSizing: field?.subscriptSizing === 'fixed' || field?.subscriptSizing === 'dynamic' ? field.subscriptSizing : '',
      floatLabel: field?.floatLabel === 'always' || field?.floatLabel === 'auto' ? field.floatLabel : '',
      extraClass: field?.extraClass ?? '',
    };
  }

  private readStored(): DemoMatFieldDraft | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return null;
      }
      const parsed = JSON.parse(raw) as Partial<DemoMatFieldDraft>;
      return {
        appearance: parsed.appearance === 'fill' || parsed.appearance === 'outline' ? parsed.appearance : '',
        subscriptSizing: parsed.subscriptSizing === 'fixed' || parsed.subscriptSizing === 'dynamic' ? parsed.subscriptSizing : '',
        floatLabel: parsed.floatLabel === 'always' || parsed.floatLabel === 'auto' ? parsed.floatLabel : '',
        extraClass: typeof parsed.extraClass === 'string' ? parsed.extraClass : '',
      };
    } catch {
      return null;
    }
  }
}
