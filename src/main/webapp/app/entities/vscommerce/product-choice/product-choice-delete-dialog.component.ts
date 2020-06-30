import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductChoice } from 'app/shared/model/vscommerce/product-choice.model';
import { ProductChoiceService } from './product-choice.service';

@Component({
  templateUrl: './product-choice-delete-dialog.component.html',
})
export class ProductChoiceDeleteDialogComponent {
  productChoice?: IProductChoice;

  constructor(
    protected productChoiceService: ProductChoiceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.productChoiceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('productChoiceListModification');
      this.activeModal.close();
    });
  }
}
