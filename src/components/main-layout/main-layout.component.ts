import { Component, ViewChild } from '@angular/core';
import { MatDrawerContainer } from '@angular/material/sidenav';

@Component({
  standalone: false,
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  @ViewChild(MatDrawerContainer) private drawerContainer?: MatDrawerContainer;
  private drawerSync = 0;

  onMenuCollapsed(): void {
    const generation = ++this.drawerSync;
    const start = performance.now();
    const tick = () => {
      if (generation !== this.drawerSync) {
        return;
      }
      this.drawerContainer?.updateContentMargins();
      if (performance.now() - start < 240) {
        requestAnimationFrame(tick);
      }
    };
    tick();
  }
}
