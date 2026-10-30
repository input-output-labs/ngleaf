import { Component, EventEmitter, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { LeafSessionService } from '@input-output-labs/ngleaf';
import { filter } from 'rxjs';
import { SHOWCASE_GROUPS, showcaseLink } from '../../app/showcase/showcase.catalog';

@Component({
  standalone: false,
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  collapsed = false;
  readonly groups = SHOWCASE_GROUPS;
  readonly linkOf = showcaseLink;
  private readonly openGroups = new Set<string>();
  @Output() collapsedChange = new EventEmitter<boolean>();

  constructor(
    public sessionService: LeafSessionService,
    private readonly router: Router,
  ) {
    this.revealActiveGroup();
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      takeUntilDestroyed(),
    ).subscribe(() => this.revealActiveGroup());
  }

  isOpen(groupId: string): boolean {
    return this.openGroups.has(groupId);
  }

  toggleGroup(groupId: string): void {
    if (this.openGroups.has(groupId)) {
      this.openGroups.delete(groupId);
    } else {
      this.openGroups.add(groupId);
    }
  }

  private revealActiveGroup(): void {
    const url = this.router.url.split('?')[0];
    const group = this.groups.find((candidate) =>
      candidate.items.some((item) => this.linkOf(item) === url)
    );
    if (group) {
      this.openGroups.add(group.id);
    }
  }

  logout() {
    this.sessionService.logout();
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed);
  }
}
