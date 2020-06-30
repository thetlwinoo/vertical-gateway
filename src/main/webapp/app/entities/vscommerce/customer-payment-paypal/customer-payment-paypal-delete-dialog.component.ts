import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICustomerPaymentPaypal } from 'app/shared/model/vscommerce/customer-payment-paypal.model';
import { CustomerPaymentPaypalService } from './customer-payment-paypal.service';

@Component({
  templateUrl: './customer-payment-paypal-delete-dialog.component.html',
})
export class CustomerPaymentPaypalDeleteDialogComponent {
  customerPaymentPaypal?: ICustomerPaymentPaypal;

  constructor(
    protected customerPaymentPaypalService: CustomerPaymentPaypalService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.customerPaymentPaypalService.delete(id).subscribe(() => {
      this.eventManager.broadcast('customerPaymentPaypalListModification');
      this.activeModal.close();
    });
  }
}
