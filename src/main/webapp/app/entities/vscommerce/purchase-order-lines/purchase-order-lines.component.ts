import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPurchaseOrderLines } from 'app/shared/model/vscommerce/purchase-order-lines.model';
import { PurchaseOrderLinesService } from './purchase-order-lines.service';
import { PurchaseOrderLinesDeleteDialogComponent } from './purchase-order-lines-delete-dialog.component';

@Component({
  selector: 'jhi-purchase-order-lines',
  templateUrl: './purchase-order-lines.component.html',
})
export class PurchaseOrderLinesComponent implements OnInit, OnDestroy {
  purchaseOrderLines?: IPurchaseOrderLines[];
  eventSubscriber?: Subscription;

  constructor(
    protected purchaseOrderLinesService: PurchaseOrderLinesService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.purchaseOrderLinesService
      .query()
      .subscribe((res: HttpResponse<IPurchaseOrderLines[]>) => (this.purchaseOrderLines = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPurchaseOrderLines();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPurchaseOrderLines): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPurchaseOrderLines(): void {
    this.eventSubscriber = this.eventManager.subscribe('purchaseOrderLinesListModification', () => this.loadAll());
  }

  delete(purchaseOrderLines: IPurchaseOrderLines): void {
    const modalRef = this.modalService.open(PurchaseOrderLinesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.purchaseOrderLines = purchaseOrderLines;
  }
}
