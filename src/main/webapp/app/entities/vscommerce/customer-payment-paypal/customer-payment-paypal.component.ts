import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICustomerPaymentPaypal } from 'app/shared/model/vscommerce/customer-payment-paypal.model';
import { CustomerPaymentPaypalService } from './customer-payment-paypal.service';
import { CustomerPaymentPaypalDeleteDialogComponent } from './customer-payment-paypal-delete-dialog.component';

@Component({
  selector: 'jhi-customer-payment-paypal',
  templateUrl: './customer-payment-paypal.component.html',
})
export class CustomerPaymentPaypalComponent implements OnInit, OnDestroy {
  customerPaymentPaypals?: ICustomerPaymentPaypal[];
  eventSubscriber?: Subscription;

  constructor(
    protected customerPaymentPaypalService: CustomerPaymentPaypalService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.customerPaymentPaypalService
      .query()
      .subscribe((res: HttpResponse<ICustomerPaymentPaypal[]>) => (this.customerPaymentPaypals = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCustomerPaymentPaypals();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICustomerPaymentPaypal): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInCustomerPaymentPaypals(): void {
    this.eventSubscriber = this.eventManager.subscribe('customerPaymentPaypalListModification', () => this.loadAll());
  }

  delete(customerPaymentPaypal: ICustomerPaymentPaypal): void {
    const modalRef = this.modalService.open(CustomerPaymentPaypalDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.customerPaymentPaypal = customerPaymentPaypal;
  }
}
