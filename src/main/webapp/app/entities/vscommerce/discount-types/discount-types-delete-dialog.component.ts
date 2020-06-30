import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDiscountTypes } from 'app/shared/model/vscommerce/discount-types.model';
import { DiscountTypesService } from './discount-types.service';

@Component({
  templateUrl: './discount-types-delete-dialog.component.html',
})
export class DiscountTypesDeleteDialogComponent {
  discountTypes?: IDiscountTypes;

  constructor(
    protected discountTypesService: DiscountTypesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.discountTypesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('discountTypesListModification');
      this.activeModal.close();
    });
  }
}
