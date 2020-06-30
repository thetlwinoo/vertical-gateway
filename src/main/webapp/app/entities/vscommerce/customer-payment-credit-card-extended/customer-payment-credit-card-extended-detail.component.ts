import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICustomerPaymentCreditCardExtended } from 'app/shared/model/vscommerce/customer-payment-credit-card-extended.model';

@Component({
  selector: 'jhi-customer-payment-credit-card-extended-detail',
  templateUrl: './customer-payment-credit-card-extended-detail.component.html',
})
export class CustomerPaymentCreditCardExtendedDetailComponent implements OnInit {
  customerPaymentCreditCardExtended: ICustomerPaymentCreditCardExtended | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      ({ customerPaymentCreditCardExtended }) => (this.customerPaymentCreditCardExtended = customerPaymentCreditCardExtended)
    );
  }

  previousState(): void {
    window.history.back();
  }
}
