import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { LeafWebImagesSeekerDialogComponent, GenericFormConfig } from '@input-output-labs/ngleaf';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css'],
})
export class TemplatesComponent {
  public passwordCheckClasses = {show: ['show-class'], hide: ['hide-class']};
  selectedImageUrl: string;
  name: string;

  public genericFormFormGroup: UntypedFormGroup = this.fb.group({
    input1: ['input1'],
    input2: ['input2'],
    input3: ['input3'],
    radios: ['radio2'],
    checkbox1: [true],
    slider1: ['75']
  });

  constructor(private dialog: MatDialog, private fb: UntypedFormBuilder) {
    this.genericFormFormGroup.valueChanges.subscribe(console.log);
  }

  openDialog(): void {
    this.dialog.open(LeafWebImagesSeekerDialogComponent, {
      width: '450px',
      data: { prefill: this.name }
    }).afterClosed().subscribe(result => {
      console.log('you picked: ', result);
      this.selectedImageUrl = result;
    });
  }

  onDone() {
    console.log('password forgotten done');
  }

  public genericFormConfig: GenericFormConfig = {
    titleKey: 'formName',
    grid: {
      cols: 2,
      gutterSize: '10px',
      rowHeight: '75px'
    },
    actions: [{
      id: 'cancel',
      labelKey: 'cancelLabel'
    },
    {
      id: 'submit',
      labelKey: 'submitLabel',
      color: 'primary'
    }],
    inputs: [
      {
        id: 'input1',
        type: 'input',
        labelKey: 'input1Label',
        placeholderKey: 'input1Placeholder',
        colspan: 2
      },
      {
        id: 'input2',
        type: 'input',
        labelKey: 'input2Label',
        placeholderKey: 'input2Placeholder'
      },
      {
        id: 'input3',
        type: 'textarea',
        labelKey: 'input3Label',
        placeholderKey: 'input3Placeholder',
        rowspan: 2
      },
      {
        id: 'radios',
        type: 'radios',
        radios: [
        {
          labelKey: 'radio1',
          value: 'radio1'
        },
        {
          labelKey: 'radio2',
          value: 'radio2'
        }
        ]
      },
      {
        id: 'checkbox1',
        type: 'checkbox',
        labelKey: 'checkbox1',
      },
      {
        type: 'text',
        labelKey: 'someVeryLongTextThatDeserveLotOfSpacesomeVeryLongTextThatDeserveLotOfSpacesomeVeryLongTextThatDeserveLotOfSpacesomeVeryLongTextThatDeserveLotOfSpace',
        colspan: 2
      },
      {
        id: 'slider1',
        type: 'slider',
        colspan: 2,
        color: 'primary',
        min: 15,
        max: 150,
        step: 10,
        thumbLabel: true
      }
    ]
  };
}

