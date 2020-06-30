import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ICustomerPaymentPaypal } from 'app/shared/model/vscommerce/customer-payment-paypal.model';

@Component({
  selector: 'jhi-customer-payment-paypal-detail',
  templateUrl: './customer-payment-paypal-detail.component.html',
})
export class CustomerPaymentPaypalDetailComponent implements OnInit {
  customerPaymentPaypal: ICustomerPaymentPaypal | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customerPaymentPaypal }) => (this.customerPaymentPaypal = customerPaymentPaypal));
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
