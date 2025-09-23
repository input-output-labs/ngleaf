import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { LeafService, PlanAttachment } from '../../../api';
import { listOrganizationServices } from '../../../store/payment/payment.actions';
import { selectAllServices } from '../../../store/payment/payment.selectors';
import { AsyncType } from '../../../store/common';

@Component({
  selector: 'leaf-services-list',
  templateUrl: './leaf-services-list.component.html',
  styleUrls: ['./leaf-services-list.component.scss']
})
export class LeafServicesListComponent implements OnInit, OnChanges {
  @Input() attachmentType: PlanAttachment = PlanAttachment.ORGANIZATION;
  @Input() attachedTo?: string;

  services$: Observable<AsyncType<LeafService[]>>;
  isLoading = false;
  hasError = false;
  private previousAttachedTo?: string;

  constructor(private store: Store) {
    this.services$ = this.store.select(selectAllServices).pipe(
      map(servicesState => {
        if (servicesState.status.success && servicesState.data && this.attachedTo) {
          const filteredServices = servicesState.data.filter(service => 
            service.attachmentType === this.attachmentType && 
            service.attachedTo === this.attachedTo
          );
          return {
            ...servicesState,
            data: filteredServices
          };
        }
        return servicesState;
      })
    );
  }

  ngOnInit(): void {
    if (this.attachedTo && this.attachmentType === PlanAttachment.ORGANIZATION) {
      this.loadServices();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['attachedTo'] && !changes['attachedTo'].firstChange) {
      const currentAttachedTo = changes['attachedTo'].currentValue;
      const previousAttachedTo = changes['attachedTo'].previousValue;
      
      // Only reload if attachedTo actually changed and we have a valid value
      if (currentAttachedTo !== previousAttachedTo && currentAttachedTo && this.attachmentType === PlanAttachment.ORGANIZATION) {
        this.loadServices();
      }
    }
  }

  private loadServices(): void {
    if (this.attachedTo) {
      this.isLoading = true;
      this.hasError = false;
      this.previousAttachedTo = this.attachedTo;
      this.store.dispatch(listOrganizationServices({ organizationId: this.attachedTo }));
    }
  }

  get hasServices(): boolean {
    // This will be handled in the template with async pipe
    return false; // Placeholder
  }

  trackByServiceId(index: number, service: LeafService): string {
    return service.id;
  }
}
