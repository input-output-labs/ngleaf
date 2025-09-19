import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { LeafConfig } from '../../../models/index';
import { LeafConfigServiceToken } from '../../../services/leaf-config.module';
import { OrganizationsApiClientService, OrganizationCandidatureData } from '../../../api';

@Component({
  selector: 'leaf-organization-candidature',
  templateUrl: './organization-candidature.component.html',
  styleUrls: ['./organization-candidature.component.scss']
})
export class OrganizationCandidatureComponent implements OnInit {
  @Input()
  public organizationId?: string;
  @Input()
  public role?: string;

  @Output()
  public candidatureStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

  public organizationName: string = '';
  public selectedRole: string = '';
  public validationError: string = '';
  public isLoading: boolean = false;
  public validationResponse: OrganizationCandidatureData | null = null;
  public missingParametersError: string = '';
  public isSubmitting: boolean = false;
  public submissionError: string = '';
  public submissionSuccess: boolean = false;

  constructor(
    private store: Store,
    @Inject(LeafConfigServiceToken) public config: LeafConfig,
    private organizationsApiClient: OrganizationsApiClientService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Extract parameters from URL query params if not provided as inputs
    this.route.queryParams.subscribe(params => {
      if (!this.organizationId) {
        this.organizationId = params['organizationId'];
      }
      if (!this.role) {
        this.role = params['role'];
      }
      
      this.selectedRole = this.role || 'Member';
      
      // Check if required parameters are missing
      if (!this.organizationId || !this.role) {
        this.missingParametersError = 'Missing required parameters: organizationId and role must be provided in the URL';
        return;
      }
      
      this.validateCandidature();
    });
  }

  private validateCandidature(): void {
    if (!this.organizationId || !this.selectedRole) {
      this.validationError = 'Missing organization ID or role';
      return;
    }

    this.isLoading = true;
    this.validationError = '';

    this.organizationsApiClient.getCandidatureData(this.organizationId, this.selectedRole).subscribe({
      next: (response: OrganizationCandidatureData) => {
        this.validationResponse = response;
        this.organizationName = response.organizationName;
        this.isLoading = false;
        
        if (response.error) {
          this.validationError = response.error;
        }
      },
      error: (error) => {
        console.error('Error validating candidature:', error);
        this.validationError = 'Failed to validate candidature. Please try again.';
        this.isLoading = false;
      }
    });
  }

  public candidate() {
    if (this.validationError || !this.validationResponse || !this.organizationId || !this.selectedRole) {
      console.error('Cannot candidate due to validation error:', this.validationError);
      return;
    }

    this.isSubmitting = true;
    this.submissionError = '';
    this.submissionSuccess = false;

    this.organizationsApiClient.candidateToOrganization(this.organizationId, this.selectedRole).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.submissionSuccess = true;
        this.candidatureStatus.emit(true);
        console.log('Candidature submitted successfully for organization:', this.organizationId, 'with role:', this.selectedRole);
      },
      error: (error) => {
        console.error('Error submitting candidature:', error);
        this.isSubmitting = false;
        this.submissionError = 'Failed to submit candidature. Please try again.';
        this.candidatureStatus.emit(false);
      }
    });
  }

  public cancel() {
    // Reset submission state
    this.submissionSuccess = false;
    this.submissionError = '';
    this.isSubmitting = false;
    
    console.log('Candidature cancelled');
    this.candidatureStatus.emit(false);
  }

  public leave() {
    this.router.navigate([this.config.navigation.afterInvitationRedirect || '/']);
  }
}
