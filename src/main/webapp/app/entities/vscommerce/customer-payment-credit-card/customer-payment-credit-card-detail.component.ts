import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ICustomerPaymentCreditCard } from 'app/shared/model/vscommerce/customer-payment-credit-card.model';

@Component({
  selector: 'jhi-customer-payment-credit-card-detail',
  templateUrl: './customer-payment-credit-card-detail.component.html',
})
export class CustomerPaymentCreditCardDetailComponent implements OnInit {
  customerPaymentCreditCard: ICustomerPaymentCreditCard | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customerPaymentCreditCard }) => (this.customerPaymentCreditCard = customerPaymentCreditCard));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
