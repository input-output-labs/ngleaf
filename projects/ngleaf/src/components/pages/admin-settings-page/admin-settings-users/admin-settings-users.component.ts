import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { LeafAdminService } from '../../../../services/core/admin/leaf-admin.service';
import { LeafAccountModel } from '../../../../models/leaf-account.model';
import { selectUsers } from '../../../../store/core/administration/administration.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'leaf-admin-settings-users',
  templateUrl: './admin-settings-users.component.html',
  styleUrls: ['./admin-settings-users.component.scss']
})
export class AdminSettingsUsersComponent implements OnInit {
  columnsToDisplay = ['id', 'email', 'username', 'isAdmin'];
  public users$: Observable<LeafAccountModel[]>;

  constructor(
    private store: Store,
    private adminService: LeafAdminService
  ) {
      this.users$ = this.store.select(selectUsers);
    }

  ngOnInit() {
    this.adminService.fetchUsers();
  }

}
