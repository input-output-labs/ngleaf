import { Component, Input, OnInit, TemplateRef, Inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { LeafAdminService } from '../../../../services/core/admin/leaf-admin.service';
import { LeafAccountModel } from '../../../../api/models/index';
import { selectUsers } from '../../../../store/core/administration/administration.selectors';
import { BehaviorSubject, Observable, combineLatest, debounceTime, map, startWith } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { LeafConfirmDialogComponent, ConfirmDialogModel } from '../../../common/confirm-dialog/confirm-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { LeafGenericDataDialogComponent } from '../../leaf-generic-data-dialog/leaf-generic-data-dialog.component';
import { LeafConfigServiceToken } from '../../../../services/leaf-config.module';
import { LeafConfig } from '../../../../models';

interface SortOption {
  value: string;
  viewValue: string;
}

@Component({
  standalone: false,
  selector: 'leaf-admin-settings-users',
  templateUrl: './admin-settings-users.component.html',
  styleUrls: ['./admin-settings-users.component.scss']
})
export class AdminSettingsUsersComponent implements OnInit {
  sortOptions: SortOption[] = [
    {value: 'registerAsc', viewValue: 'First registered'},
    {value: 'registerDesc', viewValue: 'Last registered'},
    {value: 'email', viewValue: 'Email'},
    {value: 'admin', viewValue: 'Admin'},
  ];

  public users$: Observable<LeafAccountModel[]>;
  public searchedUsers$: Observable<LeafAccountModel[]>;
  public shownUsers$: Observable<LeafAccountModel[]>;

  public pageSize$: BehaviorSubject<number> = new BehaviorSubject(10);
  public pageIndex$: BehaviorSubject<number> = new BehaviorSubject(0);
  public searchedUsersCount$: Observable<number>;

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
    private store: Store,
    private adminService: LeafAdminService,
    public dialog: MatDialog,
    fb: FormBuilder,
    @Inject(LeafConfigServiceToken) private config: LeafConfig
  ) {
      this.searchFormGroup = fb.group({
        emailFilter: [''],
        sortBy: [this.sortOptions[0].value],
      });

      this.users$ = this.store.select(selectUsers);

      const emailFilter$ = this.searchFormGroup.controls.emailFilter.valueChanges.pipe(startWith(this.searchFormGroup.controls.emailFilter.value), debounceTime(500));
      const sortBy$ = this.searchFormGroup.controls.sortBy.valueChanges.pipe(startWith(this.searchFormGroup.controls.sortBy.value));

      this.searchedUsers$ = combineLatest([
        this.users$,
        emailFilter$,
        sortBy$,
      ]).pipe(
        map(([users, emailFilter, sortBy]) => {
          return users
            .filter((user) => !emailFilter.trim() || user.email.toLowerCase().includes(emailFilter.trim().toLowerCase()))
            .sort((a, b) => {
              switch(sortBy) {
                case "email":
                  if (a.email < b.email) {
                    return -1;
                  }
                  if (a.email > b.email) {
                    return 1;
                  }
                  return 0;
                case "admin":
                  if (!a.admin && b.admin) {
                    return 1;
                  } else if (a.admin && !b.admin) {
                    return -1;
                  }
                  return 0;
                case "registerAsc":
                case "registerDesc":
                  const dA = new Date(a.metadata.creationDate);
                  const dB = new Date(b.metadata.creationDate);
                  if (sortBy === "registerAsc") {
                    return dA.getTime() - dB.getTime();
                  } else {
                    return dB.getTime() - dA.getTime();
                  }
              }
            });
        })
      );

      this.searchedUsersCount$ = this.searchedUsers$.pipe(map(searchedUsers => searchedUsers.length));

      this.shownUsers$ = combineLatest([
        this.searchedUsers$,
        this.pageSize$,
        this.pageIndex$
      ]).pipe(
        map(([searchedUsers, pageSize, pageIndex]) => {
            const start = pageIndex * pageSize;
            const end = start + pageSize;
            return searchedUsers.slice(pageIndex * pageSize, end);
          }
        )
      );
    }

    public onPageEvent(pageEvent: PageEvent) {
      this.pageSize$.next(pageEvent.pageSize);
      this.pageIndex$.next(pageEvent.pageIndex);
    }

  getColumnsToDisplay() {
    return [
      ...['id', 'email', 'profile', 'registrationDate'],
      ...!!this.extraDataTemplate ? ['extraData']: [],
      ...!!this.showGenericDataHelper ? ['genericDataHelper']: [],
      ...['isAdmin', 'actions']
    ];
  }

  ngOnInit() {
    this.adminService.fetchUsers();
  }

  public deleteAccount(account) {
    const dialogData = new ConfirmDialogModel("Delete user ?", `Are you sure you want to delete user ${account.login || account.email}`);
    const dialogWidth = this.config?.uiCustomization?.dialogWidth?.small || '400px';

    const dialogRef = this.dialog.open(LeafConfirmDialogComponent, {
      width: dialogWidth,
      maxWidth: dialogWidth,
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.adminService.deleteAccount(account.id);
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

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.fetchUsers();
      }
    });
  }
}
