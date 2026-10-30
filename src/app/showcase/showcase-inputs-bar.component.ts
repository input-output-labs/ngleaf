import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ShowcaseInputContext,
  ShowcaseInputField,
  parseShowcaseJson,
  resolveShowcaseInputs,
} from './showcase-inputs';

@Component({
  standalone: false,
  selector: 'app-showcase-inputs-bar',
  templateUrl: './showcase-inputs-bar.component.html',
  styleUrls: ['./showcase-inputs-bar.component.scss'],
})
export class ShowcaseInputsBarComponent {
  @Input() fields: ShowcaseInputField[] = [];
  @Input() context!: ShowcaseInputContext;
  @Output() inputsChange = new EventEmitter<{ inputs: Record<string, unknown>; recreate: boolean }>();

  commit(recreate: boolean): void {
    this.inputsChange.emit({
      inputs: resolveShowcaseInputs(this.fields, this.context),
      recreate,
    });
  }

  onControl(field: ShowcaseInputField): void {
    this.context.controls.get(field.name)?.setValue(String(field.value ?? ''));
    this.commit(false);
  }

  fire(field: ShowcaseInputField): void {
    this.context.triggers.get(field.name)?.next();
  }

  applyJson(field: ShowcaseInputField): void {
    try {
      field.value = parseShowcaseJson(this.context.jsonText[field.name] ?? '');
      this.context.jsonError[field.name] = '';
      this.commit(true);
    } catch {
      this.context.jsonError[field.name] = 'JSON invalide';
    }
  }
}
