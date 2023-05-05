import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';

export interface GenericFormActionConfig {
  id: string;
  labelKey?: string;
  color?: ThemePalette;
}

export type GenericFormInputType = 'text' | 'input' | 'textarea' | 'radios' | 'checkbox' | 'slider' | 'user-selector' | 'select';

export interface TextConfig {
  labelKey?: string;
}

export interface InputConfig {
  appearance?: MatFormFieldAppearance;
  labelKey?: string;
  placeholderKey?: string;
  color?: ThemePalette;
}

export interface CheckboxConfig {
  labelKey: string;
}

export interface RadioConfig {
  labelKey: string;
  value: string;
}

export interface RadiosConfig {
  radios: RadioConfig[]
}

export interface SliderConfig {
  min?: number;
  max?: number;
  step?: number;
  thumbLabel?: boolean;
}

export interface UserSelectorConfig {
  placeholderKey?: string;
  multiple: boolean;
}

export interface SelectConfig {
  choices: {value: any, labelKey: string}[]
}

export interface GenericInputConfig {
  id?: string
  type: GenericFormInputType;
  colspan?: number;
  rowspan?: number;
}

export type GenericFormInputConfig = GenericInputConfig & (TextConfig | InputConfig | RadiosConfig | CheckboxConfig | SliderConfig | UserSelectorConfig | SelectConfig);

export interface GenericFormGridConfig {
  cols?: number;
  rowHeight?: string;
  gutterSize?: string;
}

export interface GenericFormConfig {
  titleKey?: string,
  actions?: GenericFormActionConfig[],
  inputs: GenericFormInputConfig[],
  grid?: GenericFormGridConfig,
}

@Component({
  selector: 'leaf-generic-form',
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.scss']
})
export class GenericFormComponent implements OnInit {

  @Input()
  public config: GenericFormConfig;

  @Input()
  public formGroup: UntypedFormGroup;

  @Output()
  public actionClicked: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public clickOnAction(actionId: string) {
    this.formGroup.updateValueAndValidity();

    this.actionClicked.emit({
      actionId,
      errors: this.formGroup.errors,
      valid: this.formGroup.valid,
    });
  }
}
