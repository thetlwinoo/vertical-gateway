import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductSetDetails } from 'app/shared/model/vscommerce/product-set-details.model';
import { ProductSetDetailsService } from './product-set-details.service';

@Component({
  templateUrl: './product-set-details-delete-dialog.component.html',
})
export class ProductSetDetailsDeleteDialogComponent {
  productSetDetails?: IProductSetDetails;

  constructor(
    protected productSetDetailsService: ProductSetDetailsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.productSetDetailsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('productSetDetailsListModification');
      this.activeModal.close();
    });
  }
}
