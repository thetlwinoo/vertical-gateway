import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductCatalog } from 'app/shared/model/vscommerce/product-catalog.model';
import { ProductCatalogService } from './product-catalog.service';

@Component({
  templateUrl: './product-catalog-delete-dialog.component.html',
})
export class ProductCatalogDeleteDialogComponent {
  productCatalog?: IProductCatalog;

  constructor(
    protected productCatalogService: ProductCatalogService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.productCatalogService.delete(id).subscribe(() => {
      this.eventManager.broadcast('productCatalogListModification');
      this.activeModal.close();
    });
  }
}
