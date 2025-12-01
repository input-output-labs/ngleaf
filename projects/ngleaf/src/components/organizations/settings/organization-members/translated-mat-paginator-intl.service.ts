import { Injectable, OnDestroy } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';

@Injectable()
export class TranslatedMatPaginatorIntl extends MatPaginatorIntl implements OnDestroy {
  private unsubscribe$ = new Subject<void>();

  constructor(private translate: TranslateService) {
    super();
    this.translateLabels();
    
    // Update labels when language changes
    this.translate.onLangChange
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.translateLabels();
        this.changes.next();
      });
  }

  private translateLabels(): void {
    this.itemsPerPageLabel = this.translate.instant('leaf.organization-candidature.pagination.page-size');
    this.nextPageLabel = this.translate.instant('leaf.organization-candidature.pagination.next-page');
    this.previousPageLabel = this.translate.instant('leaf.organization-candidature.pagination.previous-page');
    this.firstPageLabel = this.translate.instant('leaf.organization-candidature.pagination.first-page');
    this.lastPageLabel = this.translate.instant('leaf.organization-candidature.pagination.last-page');
    
    // Get range label translation
    this.getRangeLabel = (page: number, pageSize: number, length: number): string => {
      if (length === 0 || pageSize === 0) {
        return this.translate.instant('leaf.organization-candidature.pagination.range-label-zero', { length });
      }
      
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      
      return this.translate.instant('leaf.organization-candidature.pagination.range-label', {
        start: startIndex + 1,
        end: endIndex,
        length
      });
    };
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

