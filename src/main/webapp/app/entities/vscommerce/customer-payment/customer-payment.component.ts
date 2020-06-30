import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICustomerPayment } from 'app/shared/model/vscommerce/customer-payment.model';
import { CustomerPaymentService } from './customer-payment.service';
import { CustomerPaymentDeleteDialogComponent } from './customer-payment-delete-dialog.component';

@Component({
  selector: 'jhi-customer-payment',
  templateUrl: './customer-payment.component.html',
})
export class CustomerPaymentComponent implements OnInit, OnDestroy {
  customerPayments?: ICustomerPayment[];
  eventSubscriber?: Subscription;

  constructor(
    protected customerPaymentService: CustomerPaymentService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.customerPaymentService.query().subscribe((res: HttpResponse<ICustomerPayment[]>) => (this.customerPayments = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCustomerPayments();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICustomerPayment): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCustomerPayments(): void {
    this.eventSubscriber = this.eventManager.subscribe('customerPaymentListModification', () => this.loadAll());
  }

  delete(customerPayment: ICustomerPayment): void {
    const modalRef = this.modalService.open(CustomerPaymentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.customerPayment = customerPayment;
  }
}
