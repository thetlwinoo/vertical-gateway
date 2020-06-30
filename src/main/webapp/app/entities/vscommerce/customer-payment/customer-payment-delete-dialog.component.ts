import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICustomerPayment } from 'app/shared/model/vscommerce/customer-payment.model';
import { CustomerPaymentService } from './customer-payment.service';

@Component({
  templateUrl: './customer-payment-delete-dialog.component.html',
})
export class CustomerPaymentDeleteDialogComponent {
  customerPayment?: ICustomerPayment;

  constructor(
    protected customerPaymentService: CustomerPaymentService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.customerPaymentService.delete(id).subscribe(() => {
      this.eventManager.broadcast('customerPaymentListModification');
      this.activeModal.close();
    });
  }
}
