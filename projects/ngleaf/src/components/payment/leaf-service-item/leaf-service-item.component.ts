import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LeafService } from '../../../api';
import { selectCurrentAccountData } from '../../../store/core/session/session.selectors';
import { LeafAccountModel } from '../../../api/models/leaf-account.model';
import { deleteService, updateService } from '../../../store/payment/payment.actions';
import { LeafConfirmDialogComponent, ConfirmDialogModel } from '../../../components/common/confirm-dialog/confirm-dialog.component';

@Component({
  standalone: false,
  selector: 'leaf-service-item',
  templateUrl: './leaf-service-item.component.html',
  styleUrls: ['./leaf-service-item.component.scss']
})
export class LeafServiceItemComponent implements OnInit {
  @Input() service!: LeafService;

  currentAccount$: Observable<LeafAccountModel | undefined>;
  isEditMode = false;
  editForm: FormGroup;

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private translate: TranslateService,
    private formBuilder: FormBuilder
  ) {
    this.currentAccount$ = this.store.select(selectCurrentAccountData);
    this.editForm = this.formBuilder.group({
      key: [{value: '', disabled: true}], // Key field is always disabled
      stripeProductId: [''],
      icon: [''],
      unitPrice: [0, [Validators.required, Validators.min(0)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      automaticQuantities: [{value: false, disabled: true}],
      useSubscription: [{value: false, disabled: true}]
    });
  }

  ngOnInit(): void {
    this.initializeForm();
    
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

  get formattedPrice(): string {
    if (this.service.unitPrice === undefined) {
      return 'N/A';
    }
    // Convert cents to euros
    const price = this.service.unitPrice / 100;
    return `€${price.toFixed(2)}`;
  }

  get totalPrice(): number {
    if (this.service.unitPrice === undefined || this.service.quantity === undefined) {
      return 0;
    }
    return this.service.unitPrice * this.service.quantity;
  }

  get formattedTotalPrice(): string {
    // Convert cents to euros
    const price = this.totalPrice / 100;
    return `€${price.toFixed(2)}`;
  }

  get serviceTitle(): string {
    const titleKey = `leaf.payment.service-item.titles.${this.service.key}`;
    const title = this.translate.instant(titleKey);
    // If no translation found, return the key itself or a default message
    return title !== titleKey ? title : this.service.key;
  }

  get serviceDescription(): string {
    const descriptionKey = `leaf.payment.service-item.descriptions.${this.service.key}`;
    const description = this.translate.instant(descriptionKey);
    // If no translation found, return the key itself or a default message
    return description !== descriptionKey ? description : undefined;
  }

  get keyControl() {
    return this.editForm.get('key');
  }

  get stripeProductIdControl() {
    return this.editForm.get('stripeProductId');
  }

  get iconControl() {
    return this.editForm.get('icon');
  }

  get unitPriceControl() {
    return this.editForm.get('unitPrice');
  }

  get quantityControl() {
    return this.editForm.get('quantity');
  }

  get automaticQuantitiesControl() {
    return this.editForm.get('automaticQuantities');
  }

  get useSubscriptionControl() {
    return this.editForm.get('useSubscription');
  }

  private initializeForm(): void {
    this.editForm.patchValue({
      key: this.service.key,
      stripeProductId: this.service.stripeProductId || '',
      icon: this.service.icon || '',
      unitPrice: this.service.unitPrice,
      quantity: this.service.quantity,
      automaticQuantities: this.service.automaticQuantities,
      useSubscription: this.service.useSubscription
    });
  }

  onEditService(): void {
    this.isEditMode = true;
    this.initializeForm();
  }

  onCancelEdit(): void {
    this.isEditMode = false;
    this.initializeForm();
  }

  onSaveService(): void {
    if (this.editForm.valid && this.service.id) {
      const formValue = this.editForm.value;
      const updatedService: LeafService = {
        ...this.service,
        key: this.service.key, // Keep the original key, don't allow changes
        stripeProductId: formValue.stripeProductId || undefined,
        icon: formValue.icon || undefined,
        unitPrice: formValue.unitPrice,
        quantity: formValue.automaticQuantities ? 1 : formValue.quantity, // Use 1 as default when automatic quantities is enabled
        automaticQuantities: formValue.automaticQuantities,
        useSubscription: formValue.useSubscription
      };

      this.store.dispatch(updateService({ id: this.service.id, service: updatedService }));
      this.isEditMode = false;
    }
  }

  onDeleteService(): void {
    if (!this.service.id) {
      return;
    }

    const title = this.translate.instant('leaf.payment.service-item.deleteConfirmTitle');
    const message = this.translate.instant('leaf.payment.service-item.deleteConfirmMessage');

    const dialogRef = this.dialog.open(LeafConfirmDialogComponent, {
      width: '400px',
      data: new ConfirmDialogModel(title, message)
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(deleteService({ id: this.service.id! }));
      }
    });
  }
}
