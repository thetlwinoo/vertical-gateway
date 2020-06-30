import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProductAttributeSet } from 'app/shared/model/vscommerce/product-attribute-set.model';
import { ProductAttributeSetService } from './product-attribute-set.service';
import { ProductAttributeSetDeleteDialogComponent } from './product-attribute-set-delete-dialog.component';

@Component({
  selector: 'jhi-product-attribute-set',
  templateUrl: './product-attribute-set.component.html',
})
export class ProductAttributeSetComponent implements OnInit, OnDestroy {
  productAttributeSets?: IProductAttributeSet[];
  eventSubscriber?: Subscription;

  constructor(
    protected productAttributeSetService: ProductAttributeSetService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.productAttributeSetService
      .query()
      .subscribe((res: HttpResponse<IProductAttributeSet[]>) => (this.productAttributeSets = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProductAttributeSets();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProductAttributeSet): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProductAttributeSets(): void {
    this.eventSubscriber = this.eventManager.subscribe('productAttributeSetListModification', () => this.loadAll());
  }

  delete(productAttributeSet: IProductAttributeSet): void {
    const modalRef = this.modalService.open(ProductAttributeSetDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.productAttributeSet = productAttributeSet;
  }
}
