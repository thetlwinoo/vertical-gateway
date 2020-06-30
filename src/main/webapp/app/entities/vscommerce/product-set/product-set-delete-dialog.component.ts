import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductSet } from 'app/shared/model/vscommerce/product-set.model';
import { ProductSetService } from './product-set.service';

@Component({
  templateUrl: './product-set-delete-dialog.component.html',
})
export class ProductSetDeleteDialogComponent {
  productSet?: IProductSet;

  constructor(
    protected productSetService: ProductSetService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.productSetService.delete(id).subscribe(() => {
      this.eventManager.broadcast('productSetListModification');
      this.activeModal.close();
    });
  }
}
