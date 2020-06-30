import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICustomerPaymentVoucher } from 'app/shared/model/vscommerce/customer-payment-voucher.model';
import { CustomerPaymentVoucherService } from './customer-payment-voucher.service';
import { CustomerPaymentVoucherDeleteDialogComponent } from './customer-payment-voucher-delete-dialog.component';

@Component({
  selector: 'jhi-customer-payment-voucher',
  templateUrl: './customer-payment-voucher.component.html',
})
export class CustomerPaymentVoucherComponent implements OnInit, OnDestroy {
  customerPaymentVouchers?: ICustomerPaymentVoucher[];
  eventSubscriber?: Subscription;

  constructor(
    protected customerPaymentVoucherService: CustomerPaymentVoucherService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.customerPaymentVoucherService
      .query()
      .subscribe((res: HttpResponse<ICustomerPaymentVoucher[]>) => (this.customerPaymentVouchers = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCustomerPaymentVouchers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICustomerPaymentVoucher): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCustomerPaymentVouchers(): void {
    this.eventSubscriber = this.eventManager.subscribe('customerPaymentVoucherListModification', () => this.loadAll());
  }

  delete(customerPaymentVoucher: ICustomerPaymentVoucher): void {
    const modalRef = this.modalService.open(CustomerPaymentVoucherDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.customerPaymentVoucher = customerPaymentVoucher;
  }
}
