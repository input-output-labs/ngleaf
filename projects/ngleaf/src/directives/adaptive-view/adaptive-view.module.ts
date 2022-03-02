import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdaptiveViewDirective } from './adaptive-view.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AdaptiveViewDirective],
  exports: [AdaptiveViewDirective]
})
export class AdaptiveViewModule { }
