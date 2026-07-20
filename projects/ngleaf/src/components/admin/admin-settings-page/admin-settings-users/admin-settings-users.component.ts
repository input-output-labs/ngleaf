import { Component, DestroyRef, inject, Input, TemplateRef, Inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { LeafAdminService } from '../../../../services/core/admin/leaf-admin.service';
import { AccountSearchOrder, AccountSearchResponse, LeafAccountModel } from '../../../../api/models/index';
import { BehaviorSubject, Observable, combineLatest, debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { LeafConfirmDialogComponent, ConfirmDialogModel } from '../../../common/confirm-dialog/confirm-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { LeafGenericDataDialogComponent } from '../../leaf-generic-data-dialog/leaf-generic-data-dialog.component';
import { LeafAccountFlagsDialogComponent } from '../../leaf-account-flags-dialog/leaf-account-flags-dialog.component';
import { LeafConfigServiceToken } from '../../../../services/leaf-config.module';
import { LeafConfig } from '../../../../models';

interface SortOption {
  value: AccountSearchOrder;
  viewValue: string;
}

@Component({
  standalone: false,
  selector: 'leaf-admin-settings-users',
  templateUrl: './admin-settings-users.component.html',
  styleUrls: ['./admin-settings-users.component.scss']
})
export class AdminSettingsUsersComponent {
  private readonly destroyRef = inject(DestroyRef);

  sortOptions: SortOption[] = [
    {value: 'FIRST_REGISTERED', viewValue: 'First registered'},
    {value: 'LAST_REGISTERED', viewValue: 'Last registered'},
    {value: 'EMAIL', viewValue: 'Email'},
    {value: 'ADMIN', viewValue: 'Admin'},
  ];

  public searchResult$: Observable<AccountSearchResponse>;
  public shownUsers$: Observable<LeafAccountModel[]>;
  public searchedUsersCount$: Observable<number>;

  public pageSize$: BehaviorSubject<number> = new BehaviorSubject(10);
  public pageIndex$: BehaviorSubject<number> = new BehaviorSubject(0);
  private readonly refresh$ = new BehaviorSubject<void>(undefined);

  @Input()
  extraDataTemplate?: TemplateRef<any>;

  @Input()
  expectedGenericDataKeys: string[];

  @Input()
  showGenericDataHelper: boolean = false;

  @Input()
  extraActionTemplate?: TemplateRef<any>;

  public searchFormGroup: FormGroup;

  constructor(
    private adminService: LeafAdminService,
    public dialog: MatDialog,
    fb: FormBuilder,
    @Inject(LeafConfigServiceToken) private config: LeafConfig
  ) {
      this.searchFormGroup = fb.group({
        emailFilter: [''],
        sortBy: [this.sortOptions[0].value],
      });

      const emailFilter$ = this.searchFormGroup.controls.emailFilter.valueChanges.pipe(
        startWith(this.searchFormGroup.controls.emailFilter.value),
        debounceTime(500),
        distinctUntilChanged()
      );
      const sortBy$ = this.searchFormGroup.controls.sortBy.valueChanges.pipe(
        startWith(this.searchFormGroup.controls.sortBy.value),
        distinctUntilChanged()
      );

      const filters$ = combineLatest([emailFilter$, sortBy$]);
      filters$.pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(() => this.pageIndex$.next(0));

      this.searchResult$ = combineLatest([
        filters$,
        this.pageSize$,
        this.pageIndex$,
        this.refresh$,
      ]).pipe(
        debounceTime(0),
        switchMap(([[emailFilter, sortBy], pageSize, pageIndex]) =>
          this.adminService.searchUsers({
            email: emailFilter?.trim() || undefined,
            orderBy: sortBy,
            page: pageIndex,
            pageSize,
          })
        )
      );

      this.searchedUsersCount$ = this.searchResult$.pipe(map(result => result.totalCount));
      this.shownUsers$ = this.searchResult$.pipe(map(result => result.accounts));
    }

  public onPageEvent(pageEvent: PageEvent) {
    this.pageSize$.next(pageEvent.pageSize);
    this.pageIndex$.next(pageEvent.pageIndex);
  }

  private refreshSearch() {
    this.refresh$.next();
  }

  getColumnsToDisplay() {
    return [
      ...['id', 'email', 'profile', 'registrationDate', 'flags'],
      ...!!this.extraDataTemplate ? ['extraData']: [],
      ...!!this.showGenericDataHelper ? ['genericDataHelper']: [],
      ...['isAdmin', 'actions']
    ];
  }

  public deleteAccount(account) {
    const dialogData = new ConfirmDialogModel("Delete user ?", `Are you sure you want to delete user ${account.login || account.email}`);
    const dialogWidth = this.config?.uiCustomization?.dialogWidth?.small || '400px';

    const dialogRef = this.dialog.open(LeafConfirmDialogComponent, {
      width: dialogWidth,
      maxWidth: dialogWidth,
      data: dialogData
    });

    dialogRef.afterClosed().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(confirmed => {
      if (confirmed) {
        this.adminService.deleteAccount(account.id).pipe(
          takeUntilDestroyed(this.destroyRef)
        ).subscribe(() => this.refreshSearch());
      }
    });
  }

  public getMissingGenericDataKeys(element: LeafAccountModel) {
    const missingKeys = (this.expectedGenericDataKeys || []).filter(key => !element.genericData[key]);
    return missingKeys.length > 0 ? missingKeys : null;
  }

  public openGenericDataDialog(element: LeafAccountModel) {
    const dialogWidth = this.config?.uiCustomization?.dialogWidth?.medium || '600px';
    const dialogRef = this.dialog.open(LeafGenericDataDialogComponent, {
      width: dialogWidth,
      maxWidth: dialogWidth,
      data: {
        genericData: element.genericData,
        targetType: "account",
        targetId: element.id,
        expectedGenericDataKeys: this.expectedGenericDataKeys,
      }
    });

    dialogRef.afterClosed().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(result => {
      if (result) {
        this.refreshSearch();
      }
    });
  }

  public openFlagsDialog(element: LeafAccountModel) {
    const dialogWidth = this.config?.uiCustomization?.dialogWidth?.small || '500px';
    const dialogRef = this.dialog.open(LeafAccountFlagsDialogComponent, {
      width: dialogWidth,
      maxWidth: dialogWidth,
      data: {
        accountId: element.id,
        email: element.email,
        flags: element.flags || []
      }
    });

    dialogRef.afterClosed().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(result => {
      if (result) {
        this.refreshSearch();
      }
    });
  }
}
