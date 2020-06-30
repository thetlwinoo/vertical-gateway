import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductOption } from 'app/shared/model/vscommerce/product-option.model';
import { ProductOptionService } from './product-option.service';

@Component({
  templateUrl: './product-option-delete-dialog.component.html',
})
export class ProductOptionDeleteDialogComponent {
  productOption?: IProductOption;

  constructor(
    protected productOptionService: ProductOptionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.productOptionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('productOptionListModification');
      this.activeModal.close();
    });
  }
}
