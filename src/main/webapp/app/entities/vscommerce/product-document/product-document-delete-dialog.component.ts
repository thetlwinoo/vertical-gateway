import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductDocument } from 'app/shared/model/vscommerce/product-document.model';
import { ProductDocumentService } from './product-document.service';

@Component({
  templateUrl: './product-document-delete-dialog.component.html',
})
export class ProductDocumentDeleteDialogComponent {
  productDocument?: IProductDocument;

  constructor(
    protected productDocumentService: ProductDocumentService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.productDocumentService.delete(id).subscribe(() => {
      this.eventManager.broadcast('productDocumentListModification');
      this.activeModal.close();
    });
  }
}
