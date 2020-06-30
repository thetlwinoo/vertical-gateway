import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProductCatalog } from 'app/shared/model/vscommerce/product-catalog.model';
import { ProductCatalogService } from './product-catalog.service';
import { ProductCatalogDeleteDialogComponent } from './product-catalog-delete-dialog.component';

@Component({
  selector: 'jhi-product-catalog',
  templateUrl: './product-catalog.component.html',
})
export class ProductCatalogComponent implements OnInit, OnDestroy {
  productCatalogs?: IProductCatalog[];
  eventSubscriber?: Subscription;

  constructor(
    protected productCatalogService: ProductCatalogService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.productCatalogService.query().subscribe((res: HttpResponse<IProductCatalog[]>) => (this.productCatalogs = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProductCatalogs();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProductCatalog): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProductCatalogs(): void {
    this.eventSubscriber = this.eventManager.subscribe('productCatalogListModification', () => this.loadAll());
  }

  delete(productCatalog: IProductCatalog): void {
    const modalRef = this.modalService.open(ProductCatalogDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.productCatalog = productCatalog;
  }
}
