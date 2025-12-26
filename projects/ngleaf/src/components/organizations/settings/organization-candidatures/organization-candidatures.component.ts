import { Component, OnInit, OnDestroy, Inject, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { 
  LeafOrganization, 
  OrganizationCandidature, 
  OrganizationRole,
  OrganizationsApiClientService 
} from '../../../../api';
import { LeafConfirmDialogComponent, ConfirmDialogModel } from '../../../common/confirm-dialog';
import { listMyOrganizations, selectCurrentOrganization } from '../../../../store';
import { TranslateService } from '@ngx-translate/core';
import { LeafConfigServiceToken } from '../../../../services/leaf-config.module';

@Component({
  standalone: false,
  selector: 'leaf-organization-candidatures',
  templateUrl: './organization-candidatures.component.html',
  styleUrls: ['./organization-candidatures.component.scss']
})
export class OrganizationCandidaturesComponent implements OnInit, OnDestroy, AfterViewInit {
  public invitationForm: FormGroup;
  public candidatures: OrganizationCandidature[] = [];
  public availableRoles: OrganizationRole[] = [];
  public invitationLink: string = '';
  public displayedColumns: string[] = ['date', 'email', 'role', 'status'];
  public candidatureManagementEnabled: boolean = false;
  public isUpdating: boolean = false;
  public organizationId: string = '';
  public dataSource = new MatTableDataSource<OrganizationCandidature>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  public organization$: Observable<LeafOrganization>;
  private subscriptions: Subscription[] = [];

  constructor(
    @Inject(LeafConfigServiceToken) private config,
    public dialogRef: MatDialogRef<OrganizationCandidaturesComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private store: Store,
    private organizationsApiClient: OrganizationsApiClientService,
    private dialog: MatDialog,
    private translateService: TranslateService,
  ) {
    this.invitationForm = this.fb.group({
      role: ['', Validators.required]
    });
    
    this.organization$ = this.store.pipe(select(selectCurrentOrganization));
  }

  ngOnInit(): void {
    // Load organization data and candidatures
    this.subscriptions.push(
      this.organization$.subscribe(organization => {
        if (organization) {
          this.organizationId = organization.id;
          this.availableRoles = organization.policies?.roles || [];
          const defaultRole = this.availableRoles.filter(role => role.otherDefault)[0];
          if (defaultRole) {
            this.invitationForm.get('role')?.setValue(defaultRole.name);
          }
          this.candidatures = [...(organization.candidatureManagement?.candidatures || [])].sort((a, b) => new Date(b.metadata.lastModification).getTime() - new Date(a.metadata.lastModification).getTime());
          this.dataSource.data = this.candidatures;
          this.candidatureManagementEnabled = organization.candidatureManagement?.enabled || false;
          this.generateInvitationLink();
        }
      })
    );

    // Watch for role changes to update invitation link
    this.subscriptions.push(
      this.invitationForm.get('role')?.valueChanges.subscribe(() => {
        this.generateInvitationLink();
      }) || new Subscription()
    );
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator.pageSize = 5;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public onCandidatureToggleChange(): void {
    this.isUpdating = true;
    this.organization$.pipe(take(1)).subscribe(organization => {
      if (organization?.id) {
        this.organizationsApiClient.enableCandidatureManagement(this.candidatureManagementEnabled).subscribe({
          next: (updatedOrganization) => {
            const snackbarMessage = 
              this.candidatureManagementEnabled 
                ? 'leaf.organization-candidature.candidature-management-enabled-successfully' 
                : 'leaf.organization-candidature.candidature-management-disabled-successfully';
            this.snackBar.open(this.translateService.instant(snackbarMessage), 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });
            this.isUpdating = false;
          },
          error: (error) => {
            console.error('Error updating candidature management:', error);
            this.snackBar.open(this.translateService.instant('leaf.organization-candidature.failed-to-update-candidature-management'), 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });
            // Revert the toggle state on error
            this.candidatureManagementEnabled = !this.candidatureManagementEnabled;
            this.isUpdating = false;
          }
        });
      }
    });
  }

  private generateInvitationLink(): void {
    const selectedRole = this.invitationForm.get('role')?.value;
    if (selectedRole) {
      let candidatureUri = this.config?.navigation?.candidatureUri ?? '/organizations/candidature';
      if (!candidatureUri.startsWith('/')) {
        candidatureUri = '/' + candidatureUri;
      }
      this.invitationLink = `${window.location.origin}${candidatureUri}?organizationId=${this.organizationId}&role=${selectedRole}`;
    } else {
      this.invitationLink = '';
    }
  }

  public copyInvitationLink(): void {
    if (this.invitationLink) {
      navigator.clipboard.writeText(this.invitationLink).then(() => {
        const snackbarMessage = 'leaf.organization-candidature.invitation-link-copied-to-clipboard';
        this.snackBar.open(this.translateService.instant(snackbarMessage), 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }).catch(err => {
        console.error('Failed to copy text: ', err);
        const snackbarMessage = 'leaf.organization-candidature.failed-to-copy-to-clipboard';
        this.snackBar.open(this.translateService.instant(snackbarMessage), 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      });
    }
  }

  public acceptCandidature(email: string): void {
    const title = this.translateService.instant('leaf.organization-candidature.confirm-accept-title');
    const message = this.translateService.instant('leaf.organization-candidature.confirm-accept-message');
    
    const dialogData = new ConfirmDialogModel(title, message);

    const dialogRef = this.dialog.open(LeafConfirmDialogComponent, {
      data: dialogData,
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.performAcceptCandidature(email);
      }
    });
  }

  public declineCandidature(email: string): void {
    const title = this.translateService.instant('leaf.organization-candidature.confirm-decline-title');
    const message = this.translateService.instant('leaf.organization-candidature.confirm-decline-message');
    
    const dialogData = new ConfirmDialogModel(title, message);

    const dialogRef = this.dialog.open(LeafConfirmDialogComponent, {
      data: dialogData,
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.performDeclineCandidature(email);
      }
    });
  }

  private performAcceptCandidature(email: string): void {
    this.organizationsApiClient.acceptCandidature(email).subscribe({
      next: () => {
        const snackbarMessage = 'leaf.organization-candidature.candidature-accepted-successfully';
        this.snackBar.open(this.translateService.instant(snackbarMessage), 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        this.store.dispatch(listMyOrganizations());
        this.updateCandidatureStatus(email, 'ACCEPTED');
      },
      error: (error) => {
        console.error('Error accepting candidature:', error);
        const snackbarMessage = 'leaf.organization-candidature.failed-to-accept-candidature';
        this.snackBar.open(this.translateService.instant(snackbarMessage), 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
    });
  }

  private performDeclineCandidature(email: string): void {
    this.organizationsApiClient.declineCandidature(email).subscribe({
      next: () => {
        const snackbarMessage = 'leaf.organization-candidature.candidature-declined-successfully';
        this.snackBar.open(this.translateService.instant(snackbarMessage), 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        this.store.dispatch(listMyOrganizations());
        this.updateCandidatureStatus(email, 'DECLINED');
      },
      error: (error) => {
        console.error('Error declining candidature:', error);
        const snackbarMessage = 'leaf.organization-candidature.failed-to-decline-candidature';
        this.snackBar.open(this.translateService.instant(snackbarMessage), 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
    });
  }

  private updateCandidatureStatus(email: string, status: 'ACCEPTED' | 'DECLINED'): void {
    const candidature = this.candidatures.find(c => c.email === email);
    if (candidature) {
      candidature.status = status;
    }
    this.dataSource.data = [...this.candidatures];
  }

  public getStatusColor(status: string): 'primary' | 'accent' | 'warn' {
    switch (status) {
      case 'ACCEPTED':
        return 'primary';
      case 'DECLINED':
        return 'warn';
      case 'PENDING':
      case 'CANDIDATED':
        return 'accent';
      default:
        return 'accent';
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
