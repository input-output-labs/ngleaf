import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';

import { LeafAdminService } from '../../../../services/core/admin/leaf-admin.service';
import { LeafAccountModel } from '../../../../api/models/index';
import { selectUsers } from '../../../../store/core/administration/administration.selectors';
import { Observable } from 'rxjs';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { LeafConfirmDialogComponent, ConfirmDialogModel } from '../../../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'leaf-admin-settings-users',
  templateUrl: './admin-settings-users.component.html',
  styleUrls: ['./admin-settings-users.component.scss']
})
export class AdminSettingsUsersComponent implements OnInit {
  public users$: Observable<LeafAccountModel[]>;

  @Input()
  extraDataTemplate?: TemplateRef<any>;

  @Input()
  extraActionTemplate?: TemplateRef<any>;

  constructor(
    private store: Store,
    private adminService: LeafAdminService,
    public dialog: MatDialog
  ) {
      this.users$ = this.store.select(selectUsers);
    }

  getColumnsToDisplay() {
    return [
      ...['id', 'email', 'profile', 'registrationDate'],
      ...!!this.extraDataTemplate ? ['extraData']: [],
      ...['isAdmin', 'actions']
    ];
  }

  ngOnInit() {
    this.adminService.fetchUsers();
  }

  public deleteAccount(account) {

    const dialogData = new ConfirmDialogModel("Delete user ?", `Are you sure you want to delete user ${account.login || account.email}`);

    const dialogRef = this.dialog.open(LeafConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.adminService.deleteAccount(account.id);
      }
    });
  }
}
