import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICustomerPaymentCreditCard } from 'app/shared/model/vscommerce/customer-payment-credit-card.model';
import { CustomerPaymentCreditCardService } from './customer-payment-credit-card.service';
import { CustomerPaymentCreditCardDeleteDialogComponent } from './customer-payment-credit-card-delete-dialog.component';

@Component({
  selector: 'jhi-customer-payment-credit-card',
  templateUrl: './customer-payment-credit-card.component.html',
})
export class CustomerPaymentCreditCardComponent implements OnInit, OnDestroy {
  customerPaymentCreditCards?: ICustomerPaymentCreditCard[];
  eventSubscriber?: Subscription;

  constructor(
    protected customerPaymentCreditCardService: CustomerPaymentCreditCardService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.customerPaymentCreditCardService
      .query()
      .subscribe((res: HttpResponse<ICustomerPaymentCreditCard[]>) => (this.customerPaymentCreditCards = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCustomerPaymentCreditCards();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICustomerPaymentCreditCard): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInCustomerPaymentCreditCards(): void {
    this.eventSubscriber = this.eventManager.subscribe('customerPaymentCreditCardListModification', () => this.loadAll());
  }

  delete(customerPaymentCreditCard: ICustomerPaymentCreditCard): void {
    const modalRef = this.modalService.open(CustomerPaymentCreditCardDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.customerPaymentCreditCard = customerPaymentCreditCard;
  }
}
