import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICustomerPaymentVoucher } from 'app/shared/model/vscommerce/customer-payment-voucher.model';
import { CustomerPaymentVoucherService } from './customer-payment-voucher.service';

@Component({
  templateUrl: './customer-payment-voucher-delete-dialog.component.html',
})
export class CustomerPaymentVoucherDeleteDialogComponent {
  customerPaymentVoucher?: ICustomerPaymentVoucher;

  constructor(
    protected customerPaymentVoucherService: CustomerPaymentVoucherService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.customerPaymentVoucherService.delete(id).subscribe(() => {
      this.eventManager.broadcast('customerPaymentVoucherListModification');
      this.activeModal.close();
    });
  }
}
