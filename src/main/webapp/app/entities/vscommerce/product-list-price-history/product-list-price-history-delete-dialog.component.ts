import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductListPriceHistory } from 'app/shared/model/vscommerce/product-list-price-history.model';
import { ProductListPriceHistoryService } from './product-list-price-history.service';

@Component({
  templateUrl: './product-list-price-history-delete-dialog.component.html',
})
export class ProductListPriceHistoryDeleteDialogComponent {
  productListPriceHistory?: IProductListPriceHistory;

  constructor(
    protected productListPriceHistoryService: ProductListPriceHistoryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.productListPriceHistoryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('productListPriceHistoryListModification');
      this.activeModal.close();
    });
  }
}
