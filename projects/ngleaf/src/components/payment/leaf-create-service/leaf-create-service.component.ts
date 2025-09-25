import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { filter, Observable, take, tap } from 'rxjs';
import { LeafService, PlanAttachment } from '../../../api';
import { createService, fetchAvailableServices } from '../../../store/payment/payment.actions';
import { selectCreateService, selectAvailableServicesData, selectAvailableServices } from '../../../store/payment/payment.selectors';
import { AsyncType } from '../../../store/common';

@Component({
  selector: 'leaf-create-service',
  templateUrl: './leaf-create-service.component.html',
  styleUrls: ['./leaf-create-service.component.scss']
})
export class LeafCreateServiceComponent implements OnInit {
  @Input() attachmentType: PlanAttachment = PlanAttachment.ORGANIZATION;
  @Input() attachedTo: string = '';
  
  @Output() serviceCreated = new EventEmitter<void>();
  @Output() serviceCreationError = new EventEmitter<void>();

  createServiceForm: FormGroup;
  isSubmitting = false;
  availableServices$: Observable<LeafService[]>;
  availableServicesState$: Observable<AsyncType<LeafService[]>>;


  constructor(
    private formBuilder: FormBuilder,
    private store: Store
  ) {
    this.createServiceForm = this.formBuilder.group({
      key: ['', [Validators.required, Validators.minLength(1)]],
      icon: [''],
      unitPrice: [0, [Validators.required, Validators.min(0)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      automaticQuantities: [false],
      useSubscription: [false]
    });
  }

  ngOnInit(): void {
    this.availableServices$ = this.store.select(selectAvailableServicesData);
    this.availableServicesState$ = this.store.select(selectAvailableServices);
    
    // Fetch available services
    this.store.dispatch(fetchAvailableServices());
    
    // Watch for automaticQuantities changes to handle quantity field validation
    this.automaticQuantitiesControl?.valueChanges.subscribe(automaticQuantities => {
      if (automaticQuantities) {
        // Clear quantity validation when automatic quantities is enabled
        this.quantityControl?.clearValidators();
        this.quantityControl?.updateValueAndValidity();
      } else {
        // Restore quantity validation when automatic quantities is disabled
        this.quantityControl?.setValidators([Validators.required, Validators.min(1)]);
        this.quantityControl?.updateValueAndValidity();
      }
    });
  }

  get keyControl() {
    return this.createServiceForm.get('key');
  }

  get iconControl() {
    return this.createServiceForm.get('icon');
  }

  get unitPriceControl() {
    return this.createServiceForm.get('unitPrice');
  }

  get quantityControl() {
    return this.createServiceForm.get('quantity');
  }

  get automaticQuantitiesControl() {
    return this.createServiceForm.get('automaticQuantities');
  }

  get useSubscriptionControl() {
    return this.createServiceForm.get('useSubscription');
  }

  onServiceSelected(serviceKey: string, availableServices: LeafService[]): void {
    if (serviceKey && availableServices && availableServices.length > 0) {
      const selectedService = availableServices.find(service => service.key === serviceKey);
      if (selectedService) {
        if (selectedService.unitPrice !== undefined) {
          this.unitPriceControl?.setValue(selectedService.unitPrice);
        }
        if (selectedService.icon !== undefined) {
          this.iconControl?.setValue(selectedService.icon);
        }
        if (selectedService.automaticQuantities !== undefined) {
          this.automaticQuantitiesControl?.setValue(selectedService.automaticQuantities);
        }
        if (selectedService.useSubscription !== undefined) {
          this.useSubscriptionControl?.setValue(selectedService.useSubscription);
        }
      }
    }
  }

  onSubmit(): void {
    if (this.createServiceForm.valid && !this.isSubmitting) {
      const formValue = this.createServiceForm.value;
      
      const service: LeafService = {
        attachmentType: this.attachmentType,
        attachedTo: this.attachedTo,
        key: formValue.key,
        icon: formValue.icon || undefined,
        unitPrice: formValue.unitPrice,
        quantity: formValue.automaticQuantities ? 1 : formValue.quantity, // Use 1 as default when automatic quantities is enabled
        automaticQuantities: formValue.automaticQuantities,
        useSubscription: formValue.useSubscription,
      };

      this.isSubmitting = true;
      this.store.dispatch(createService({ service }));

      this.store.pipe(
        select(selectCreateService),
        filter((asyncItem: AsyncType<LeafService>) => !asyncItem.status.pending),
        take(1)
      ).subscribe((asyncItem: AsyncType<LeafService>) => {
        this.isSubmitting = false;
        if (asyncItem.status.success) {
          this.serviceCreated.emit();
        } else if (asyncItem.status.failure) {
          this.serviceCreationError.emit();
        }
      });
    }
  }

  onCancel(): void {
    this.createServiceForm.reset();
  }
}
