import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICustomerPaymentCreditCardExtended } from 'app/shared/model/vscommerce/customer-payment-credit-card-extended.model';
import { CustomerPaymentCreditCardExtendedService } from './customer-payment-credit-card-extended.service';

@Component({
  templateUrl: './customer-payment-credit-card-extended-delete-dialog.component.html',
})
export class CustomerPaymentCreditCardExtendedDeleteDialogComponent {
  customerPaymentCreditCardExtended?: ICustomerPaymentCreditCardExtended;

  constructor(
    protected customerPaymentCreditCardExtendedService: CustomerPaymentCreditCardExtendedService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.customerPaymentCreditCardExtendedService.delete(id).subscribe(() => {
      this.eventManager.broadcast('customerPaymentCreditCardExtendedListModification');
      this.activeModal.close();
    });
  }
}
