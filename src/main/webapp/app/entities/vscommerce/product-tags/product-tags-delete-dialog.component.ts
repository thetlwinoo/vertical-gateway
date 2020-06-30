import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductTags } from 'app/shared/model/vscommerce/product-tags.model';
import { ProductTagsService } from './product-tags.service';

@Component({
  templateUrl: './product-tags-delete-dialog.component.html',
})
export class ProductTagsDeleteDialogComponent {
  productTags?: IProductTags;

  constructor(
    protected productTagsService: ProductTagsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.productTagsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('productTagsListModification');
      this.activeModal.close();
    });
  }
}
