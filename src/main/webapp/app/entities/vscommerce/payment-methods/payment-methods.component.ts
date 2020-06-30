import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPaymentMethods } from 'app/shared/model/vscommerce/payment-methods.model';
import { PaymentMethodsService } from './payment-methods.service';
import { PaymentMethodsDeleteDialogComponent } from './payment-methods-delete-dialog.component';

@Component({
  selector: 'jhi-payment-methods',
  templateUrl: './payment-methods.component.html',
})
export class PaymentMethodsComponent implements OnInit, OnDestroy {
  paymentMethods?: IPaymentMethods[];
  eventSubscriber?: Subscription;

  constructor(
    protected paymentMethodsService: PaymentMethodsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.paymentMethodsService.query().subscribe((res: HttpResponse<IPaymentMethods[]>) => (this.paymentMethods = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPaymentMethods();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPaymentMethods): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPaymentMethods(): void {
    this.eventSubscriber = this.eventManager.subscribe('paymentMethodsListModification', () => this.loadAll());
  }

  delete(paymentMethods: IPaymentMethods): void {
    const modalRef = this.modalService.open(PaymentMethodsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.paymentMethods = paymentMethods;
  }
}
