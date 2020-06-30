import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICustomerPaymentBankTransfer } from 'app/shared/model/vscommerce/customer-payment-bank-transfer.model';
import { CustomerPaymentBankTransferService } from './customer-payment-bank-transfer.service';

@Component({
  templateUrl: './customer-payment-bank-transfer-delete-dialog.component.html',
})
export class CustomerPaymentBankTransferDeleteDialogComponent {
  customerPaymentBankTransfer?: ICustomerPaymentBankTransfer;

  constructor(
    protected customerPaymentBankTransferService: CustomerPaymentBankTransferService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.customerPaymentBankTransferService.delete(id).subscribe(() => {
      this.eventManager.broadcast('customerPaymentBankTransferListModification');
      this.activeModal.close();
    });
  }
}
