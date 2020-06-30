import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductOptionSet } from 'app/shared/model/vscommerce/product-option-set.model';
import { ProductOptionSetService } from './product-option-set.service';

@Component({
  templateUrl: './product-option-set-delete-dialog.component.html',
})
export class ProductOptionSetDeleteDialogComponent {
  productOptionSet?: IProductOptionSet;

  constructor(
    protected productOptionSetService: ProductOptionSetService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.productOptionSetService.delete(id).subscribe(() => {
      this.eventManager.broadcast('productOptionSetListModification');
      this.activeModal.close();
    });
  }
}
