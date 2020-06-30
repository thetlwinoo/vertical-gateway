import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPurchaseOrders } from 'app/shared/model/vscommerce/purchase-orders.model';
import { PurchaseOrdersService } from './purchase-orders.service';
import { PurchaseOrdersDeleteDialogComponent } from './purchase-orders-delete-dialog.component';

@Component({
  selector: 'jhi-purchase-orders',
  templateUrl: './purchase-orders.component.html',
})
export class PurchaseOrdersComponent implements OnInit, OnDestroy {
  purchaseOrders?: IPurchaseOrders[];
  eventSubscriber?: Subscription;

  constructor(
    protected purchaseOrdersService: PurchaseOrdersService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.purchaseOrdersService.query().subscribe((res: HttpResponse<IPurchaseOrders[]>) => (this.purchaseOrders = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPurchaseOrders();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPurchaseOrders): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPurchaseOrders(): void {
    this.eventSubscriber = this.eventManager.subscribe('purchaseOrdersListModification', () => this.loadAll());
  }

  delete(purchaseOrders: IPurchaseOrders): void {
    const modalRef = this.modalService.open(PurchaseOrdersDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.purchaseOrders = purchaseOrders;
  }
}
