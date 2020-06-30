import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICustomerPaymentCreditCardExtended } from 'app/shared/model/vscommerce/customer-payment-credit-card-extended.model';
import { CustomerPaymentCreditCardExtendedService } from './customer-payment-credit-card-extended.service';
import { CustomerPaymentCreditCardExtendedDeleteDialogComponent } from './customer-payment-credit-card-extended-delete-dialog.component';

@Component({
  selector: 'jhi-customer-payment-credit-card-extended',
  templateUrl: './customer-payment-credit-card-extended.component.html',
})
export class CustomerPaymentCreditCardExtendedComponent implements OnInit, OnDestroy {
  customerPaymentCreditCardExtendeds?: ICustomerPaymentCreditCardExtended[];
  eventSubscriber?: Subscription;

  constructor(
    protected customerPaymentCreditCardExtendedService: CustomerPaymentCreditCardExtendedService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.customerPaymentCreditCardExtendedService
      .query()
      .subscribe((res: HttpResponse<ICustomerPaymentCreditCardExtended[]>) => (this.customerPaymentCreditCardExtendeds = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCustomerPaymentCreditCardExtendeds();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICustomerPaymentCreditCardExtended): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCustomerPaymentCreditCardExtendeds(): void {
    this.eventSubscriber = this.eventManager.subscribe('customerPaymentCreditCardExtendedListModification', () => this.loadAll());
  }

  delete(customerPaymentCreditCardExtended: ICustomerPaymentCreditCardExtended): void {
    const modalRef = this.modalService.open(CustomerPaymentCreditCardExtendedDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.customerPaymentCreditCardExtended = customerPaymentCreditCardExtended;
  }
}
