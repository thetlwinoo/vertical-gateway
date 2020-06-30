import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICustomerPaymentVoucher } from 'app/shared/model/vscommerce/customer-payment-voucher.model';

@Component({
  selector: 'jhi-customer-payment-voucher-detail',
  templateUrl: './customer-payment-voucher-detail.component.html',
})
export class CustomerPaymentVoucherDetailComponent implements OnInit {
  customerPaymentVoucher: ICustomerPaymentVoucher | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customerPaymentVoucher }) => (this.customerPaymentVoucher = customerPaymentVoucher));
  }

  previousState(): void {
    window.history.back();
  }
}
