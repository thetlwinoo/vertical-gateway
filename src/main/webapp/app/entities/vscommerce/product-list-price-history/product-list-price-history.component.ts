import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProductListPriceHistory } from 'app/shared/model/vscommerce/product-list-price-history.model';
import { ProductListPriceHistoryService } from './product-list-price-history.service';
import { ProductListPriceHistoryDeleteDialogComponent } from './product-list-price-history-delete-dialog.component';

@Component({
  selector: 'jhi-product-list-price-history',
  templateUrl: './product-list-price-history.component.html',
})
export class ProductListPriceHistoryComponent implements OnInit, OnDestroy {
  productListPriceHistories?: IProductListPriceHistory[];
  eventSubscriber?: Subscription;

  constructor(
    protected productListPriceHistoryService: ProductListPriceHistoryService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.productListPriceHistoryService
      .query()
      .subscribe((res: HttpResponse<IProductListPriceHistory[]>) => (this.productListPriceHistories = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProductListPriceHistories();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProductListPriceHistory): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProductListPriceHistories(): void {
    this.eventSubscriber = this.eventManager.subscribe('productListPriceHistoryListModification', () => this.loadAll());
  }

  delete(productListPriceHistory: IProductListPriceHistory): void {
    const modalRef = this.modalService.open(ProductListPriceHistoryDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.productListPriceHistory = productListPriceHistory;
  }
}
