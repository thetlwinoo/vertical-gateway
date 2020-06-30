import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductBrand } from 'app/shared/model/vscommerce/product-brand.model';
import { ProductBrandService } from './product-brand.service';

@Component({
  templateUrl: './product-brand-delete-dialog.component.html',
})
export class ProductBrandDeleteDialogComponent {
  productBrand?: IProductBrand;

  constructor(
    protected productBrandService: ProductBrandService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.productBrandService.delete(id).subscribe(() => {
      this.eventManager.broadcast('productBrandListModification');
      this.activeModal.close();
    });
  }
}
