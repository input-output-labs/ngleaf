import { Directive, DoCheck, ElementRef, Inject, Input, OnInit, Optional, Renderer2 } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { LeafConfig } from '../../models/leaf-config.model';
import { LeafConfigServiceToken } from '../../services/leaf-config.module';

@Directive({
  selector: 'mat-form-field',
  standalone: false,
})
export class LeafMatFieldDirective implements OnInit, DoCheck {
  @Input() leafMatFieldAppearance?: 'fill' | 'outline' | null;

  private appliedClasses: string[] = [];

  constructor(
    private formField: MatFormField,
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    @Optional() @Inject(LeafConfigServiceToken) private config: LeafConfig | null,
  ) {}

  ngOnInit(): void {
    this.apply();
  }

  ngDoCheck(): void {
    this.apply();
  }

  private apply(): void {
    const field = this.config?.uiCustomization?.material?.['mat-field'];
    const appearance = this.leafMatFieldAppearance || field?.appearance;
    if (appearance && this.formField.appearance !== appearance) {
      this.formField.appearance = appearance;
    }
    if (field?.subscriptSizing && this.formField.subscriptSizing !== field.subscriptSizing) {
      this.formField.subscriptSizing = field.subscriptSizing;
    }
    if (field?.floatLabel && this.formField.floatLabel !== field.floatLabel) {
      this.formField.floatLabel = field.floatLabel;
    }
    this.syncExtraClass(field?.extraClass ?? '');
  }

  private syncExtraClass(extraClass: string): void {
    const next = extraClass.split(/\s+/).filter((className) => className.length > 0);
    if (next.join(' ') === this.appliedClasses.join(' ')) {
      return;
    }
    for (const className of this.appliedClasses) {
      if (!next.includes(className)) {
        this.renderer.removeClass(this.elementRef.nativeElement, className);
      }
    }
    for (const className of next) {
      this.renderer.addClass(this.elementRef.nativeElement, className);
    }
    this.appliedClasses = next;
  }
}
