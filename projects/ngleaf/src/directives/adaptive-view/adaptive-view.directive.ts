import { Directive, HostListener, Input, TemplateRef, ViewContainerRef } from '@angular/core';

export type AdaptiveViewParameters = 
  'only-mobile'
  | 'only-tablet'
  | 'only-desktop'
  | 'except-mobile'
  | 'except-tablet'
  | 'except-desktop';

@Directive({
    selector: '[leafAdaptiveView]',
    standalone: false
})
export class AdaptiveViewDirective {
  private readonly MOBILE_TABLET_SEPARATOR = 480;
  private readonly TABLET_DESKTOP_SEPARATOR = 768;

  private hasView = false;

  private screenWidth: any;
  private condition: AdaptiveViewParameters;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
    this.screenWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(_event) {
    this.screenWidth = window.innerWidth;
    this.applyCondition();
  }

  @Input() set leafAdaptiveView(condition: AdaptiveViewParameters) {
    this.condition = condition;
    this.applyCondition();
  }

  private applyCondition() {
    let show = false;
    if (this.screenWidth <= this.MOBILE_TABLET_SEPARATOR) {
      // mobile
      if (this.condition === 'only-mobile' || this.condition === 'except-tablet' || this.condition === 'except-desktop') {
        show = true;
      }
    } else if (this.screenWidth <= this.TABLET_DESKTOP_SEPARATOR) {
      // tablet
      if (this.condition === 'only-tablet' || this.condition === 'except-mobile' || this.condition === 'except-desktop') {
        show = true;
      }
    } else {
      // desktop
      if (this.condition === 'only-desktop' || this.condition === 'except-mobile' || this.condition === 'except-tablet') {
        show = true;
      }
    }

    if (show && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!show && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
