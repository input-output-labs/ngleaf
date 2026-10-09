import { Inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';

import { LeafAccountModel } from '../../../api/models';
import { LeafConfig } from '../../../models';
import { selectCurrentAccountData } from '../../../store/core/session';
import { LeafConfigServiceToken } from '../../leaf-config.module';
import { LeafLegalNoticeDialogComponent } from './leaf-legal-notice-dialog.component';

@Injectable()
export class LeafLegalNoticeService {
  private started = false;
  private dialogOpen = false;
  private dismissedAccountId: string | null = null;

  constructor(
    @Inject(LeafConfigServiceToken) private config: LeafConfig,
    private store: Store,
    private dialog: MatDialog,
  ) {}

  public watch(): void {
    if (this.started || !this.config.legalNotice?.enable) {
      return;
    }
    this.started = true;

    this.store.pipe(
      select(selectCurrentAccountData),
    ).subscribe((account) => this.onAccount(account));
  }

  private onAccount(account: LeafAccountModel | undefined): void {
    if (!account?.id) {
      this.dismissedAccountId = null;
      return;
    }
    if (this.dialogOpen || this.dismissedAccountId === account.id) {
      return;
    }
    if (!this.needsApproval(account)) {
      return;
    }
    this.openDialog(account);
  }

  private needsApproval(account: LeafAccountModel): boolean {
    if (!account.legalNoticeApprovedAt) {
      return true;
    }

    const requiredAt = this.config.legalNotice?.requiredApprovalAt;
    if (!requiredAt) {
      return false;
    }

    const approvedTime = Date.parse(account.legalNoticeApprovedAt);
    const requiredTime = Date.parse(requiredAt);
    if (Number.isNaN(approvedTime)) {
      return true;
    }
    if (Number.isNaN(requiredTime)) {
      return false;
    }
    return approvedTime < requiredTime;
  }

  private panelClasses(extra?: string | string[]): string[] {
    const classes = ['leaf-legal-notice-dialog-panel'];
    if (!extra) {
      return classes;
    }
    return classes.concat(Array.isArray(extra) ? extra : [extra]);
  }

  private openDialog(account: LeafAccountModel): void {
    this.dialogOpen = true;
    const legalNotice = this.config.legalNotice;
    const dialogRef = this.dialog.open(LeafLegalNoticeDialogComponent, {
      data: {
        legalNoticeLink: legalNotice?.legalNoticeLink,
        illustrationUrl: legalNotice?.illustrationUrl,
      },
      width: legalNotice?.width || '440px',
      maxWidth: 'calc(100vw - 24px)',
      maxHeight: 'calc(100dvh - 24px)',
      autoFocus: false,
      restoreFocus: true,
      panelClass: this.panelClasses(legalNotice?.panelClass),
    });

    dialogRef.afterClosed().subscribe((accepted: boolean) => {
      this.dialogOpen = false;
      if (!accepted) {
        this.dismissedAccountId = account.id;
      }
    });
  }
}
