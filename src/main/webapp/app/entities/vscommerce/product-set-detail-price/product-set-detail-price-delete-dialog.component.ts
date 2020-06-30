import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductSetDetailPrice } from 'app/shared/model/vscommerce/product-set-detail-price.model';
import { ProductSetDetailPriceService } from './product-set-detail-price.service';

@Component({
  templateUrl: './product-set-detail-price-delete-dialog.component.html',
})
export class ProductSetDetailPriceDeleteDialogComponent {
  productSetDetailPrice?: IProductSetDetailPrice;

  constructor(
    protected productSetDetailPriceService: ProductSetDetailPriceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.productSetDetailPriceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('productSetDetailPriceListModification');
      this.activeModal.close();
    });
  }
}
