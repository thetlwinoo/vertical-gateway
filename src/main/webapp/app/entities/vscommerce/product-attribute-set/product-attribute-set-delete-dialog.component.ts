import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductAttributeSet } from 'app/shared/model/vscommerce/product-attribute-set.model';
import { ProductAttributeSetService } from './product-attribute-set.service';

@Component({
  templateUrl: './product-attribute-set-delete-dialog.component.html',
})
export class ProductAttributeSetDeleteDialogComponent {
  productAttributeSet?: IProductAttributeSet;

  constructor(
    protected productAttributeSetService: ProductAttributeSetService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.productAttributeSetService.delete(id).subscribe(() => {
      this.eventManager.broadcast('productAttributeSetListModification');
      this.activeModal.close();
    });
  }
}
