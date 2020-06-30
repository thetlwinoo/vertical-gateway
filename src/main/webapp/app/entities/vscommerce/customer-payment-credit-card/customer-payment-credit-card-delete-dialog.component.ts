import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICustomerPaymentCreditCard } from 'app/shared/model/vscommerce/customer-payment-credit-card.model';
import { CustomerPaymentCreditCardService } from './customer-payment-credit-card.service';

@Component({
  templateUrl: './customer-payment-credit-card-delete-dialog.component.html',
})
export class CustomerPaymentCreditCardDeleteDialogComponent {
  customerPaymentCreditCard?: ICustomerPaymentCreditCard;

  constructor(
    protected customerPaymentCreditCardService: CustomerPaymentCreditCardService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.customerPaymentCreditCardService.delete(id).subscribe(() => {
      this.eventManager.broadcast('customerPaymentCreditCardListModification');
      this.activeModal.close();
    });
  }
}
