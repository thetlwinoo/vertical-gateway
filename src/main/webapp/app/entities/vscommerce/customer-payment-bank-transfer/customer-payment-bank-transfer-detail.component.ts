import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICustomerPaymentBankTransfer } from 'app/shared/model/vscommerce/customer-payment-bank-transfer.model';

@Component({
  selector: 'jhi-customer-payment-bank-transfer-detail',
  templateUrl: './customer-payment-bank-transfer-detail.component.html',
})
export class CustomerPaymentBankTransferDetailComponent implements OnInit {
  customerPaymentBankTransfer: ICustomerPaymentBankTransfer | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      ({ customerPaymentBankTransfer }) => (this.customerPaymentBankTransfer = customerPaymentBankTransfer)
    );
  }

  previousState(): void {
    window.history.back();
  }
}
