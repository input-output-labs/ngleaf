import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { LeafAdminService } from '../../../../services/core/admin/leaf-admin.service';
import { LeafAccountModel } from '../../../../api/models/index';
import { selectUsers } from '../../../../store/core/administration/administration.selectors';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'leaf-admin-settings-users',
  templateUrl: './admin-settings-users.component.html',
  styleUrls: ['./admin-settings-users.component.scss']
})
export class AdminSettingsUsersComponent implements OnInit {
  columnsToDisplay = ['id', 'email', 'username', 'registrationDate', 'isAdmin', 'actions'];
  public users$: Observable<LeafAccountModel[]>;

  constructor(
    private store: Store,
    private adminService: LeafAdminService,
    public dialog: MatDialog
  ) {
      this.users$ = this.store.select(selectUsers);
    }

  ngOnInit() {
    this.adminService.fetchUsers();
  }

  public deleteAccount(account) {

    const dialogData = new ConfirmDialogModel("Delete user ?", `Are you sure you want to delete user ${account.login || account.email}`);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
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
