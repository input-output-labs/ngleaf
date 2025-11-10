import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
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
export class OrganizationCandidaturesComponent implements OnInit, OnDestroy {
  public invitationForm: FormGroup;
  public candidatures: OrganizationCandidature[] = [];
  public availableRoles: OrganizationRole[] = [];
  public invitationLink: string = '';
  public displayedColumns: string[] = ['date', 'email', 'role', 'status'];
  public candidatureManagementEnabled: boolean = false;
  public isUpdating: boolean = false;
  public organizationId: string = '';
  
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
          this.candidatures = organization.candidatureManagement?.candidatures || [];
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

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public onCandidatureToggleChange(): void {
    this.isUpdating = true;
    this.organization$.pipe(take(1)).subscribe(organization => {
      if (organization?.id) {
        this.organizationsApiClient.enableCandidatureManagement(this.candidatureManagementEnabled).subscribe({
          next: (updatedOrganization) => {
            this.snackBar.open(
              this.candidatureManagementEnabled 
                ? 'Candidature management enabled successfully' 
                : 'Candidature management disabled successfully', 
              'Close', 
              {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              }
            );
            this.isUpdating = false;
          },
          error: (error) => {
            console.error('Error updating candidature management:', error);
            this.snackBar.open('Failed to update candidature management', 'Close', {
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
        this.snackBar.open('Invitation link copied to clipboard!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }).catch(err => {
        console.error('Failed to copy text: ', err);
        this.snackBar.open('Failed to copy to clipboard', 'Close', {
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
        this.snackBar.open('Candidature accepted successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        this.store.dispatch(listMyOrganizations());
        this.updateCandidatureStatus(email, 'ACCEPTED');
        // Refresh organization data to reflect the changes
        this.onClose();
      },
      error: (error) => {
        console.error('Error accepting candidature:', error);
        this.snackBar.open('Failed to accept candidature', 'Close', {
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
        this.snackBar.open('Candidature declined successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        this.store.dispatch(listMyOrganizations());
        this.updateCandidatureStatus(email, 'DECLINED');
        // Refresh organization data to reflect the changes
        this.onClose();
      },
      error: (error) => {
        console.error('Error declining candidature:', error);
        this.snackBar.open('Failed to decline candidature', 'Close', {
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
