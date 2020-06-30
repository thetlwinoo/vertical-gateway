import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICustomerPayment } from 'app/shared/model/vscommerce/customer-payment.model';

@Component({
  selector: 'jhi-customer-payment-detail',
  templateUrl: './customer-payment-detail.component.html',
})
export class CustomerPaymentDetailComponent implements OnInit {
  customerPayment: ICustomerPayment | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customerPayment }) => (this.customerPayment = customerPayment));
  }

  previousState(): void {
    window.history.back();
  }
}
