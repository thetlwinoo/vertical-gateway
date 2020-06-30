import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICustomerPaymentBankTransfer } from 'app/shared/model/vscommerce/customer-payment-bank-transfer.model';
import { CustomerPaymentBankTransferService } from './customer-payment-bank-transfer.service';
import { CustomerPaymentBankTransferDeleteDialogComponent } from './customer-payment-bank-transfer-delete-dialog.component';

@Component({
  selector: 'jhi-customer-payment-bank-transfer',
  templateUrl: './customer-payment-bank-transfer.component.html',
})
export class CustomerPaymentBankTransferComponent implements OnInit, OnDestroy {
  customerPaymentBankTransfers?: ICustomerPaymentBankTransfer[];
  eventSubscriber?: Subscription;

  constructor(
    protected customerPaymentBankTransferService: CustomerPaymentBankTransferService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.customerPaymentBankTransferService
      .query()
      .subscribe((res: HttpResponse<ICustomerPaymentBankTransfer[]>) => (this.customerPaymentBankTransfers = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCustomerPaymentBankTransfers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICustomerPaymentBankTransfer): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCustomerPaymentBankTransfers(): void {
    this.eventSubscriber = this.eventManager.subscribe('customerPaymentBankTransferListModification', () => this.loadAll());
  }

  delete(customerPaymentBankTransfer: ICustomerPaymentBankTransfer): void {
    const modalRef = this.modalService.open(CustomerPaymentBankTransferDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.customerPaymentBankTransfer = customerPaymentBankTransfer;
  }
}
