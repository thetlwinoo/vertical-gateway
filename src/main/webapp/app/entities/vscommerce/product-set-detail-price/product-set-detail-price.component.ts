import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProductSetDetailPrice } from 'app/shared/model/vscommerce/product-set-detail-price.model';
import { ProductSetDetailPriceService } from './product-set-detail-price.service';
import { ProductSetDetailPriceDeleteDialogComponent } from './product-set-detail-price-delete-dialog.component';

@Component({
  selector: 'jhi-product-set-detail-price',
  templateUrl: './product-set-detail-price.component.html',
})
export class ProductSetDetailPriceComponent implements OnInit, OnDestroy {
  productSetDetailPrices?: IProductSetDetailPrice[];
  eventSubscriber?: Subscription;

  constructor(
    protected productSetDetailPriceService: ProductSetDetailPriceService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.productSetDetailPriceService
      .query()
      .subscribe((res: HttpResponse<IProductSetDetailPrice[]>) => (this.productSetDetailPrices = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProductSetDetailPrices();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProductSetDetailPrice): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProductSetDetailPrices(): void {
    this.eventSubscriber = this.eventManager.subscribe('productSetDetailPriceListModification', () => this.loadAll());
  }

  delete(productSetDetailPrice: IProductSetDetailPrice): void {
    const modalRef = this.modalService.open(ProductSetDetailPriceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.productSetDetailPrice = productSetDetailPrice;
  }
}
