import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDiscountDetails } from 'app/shared/model/vscommerce/discount-details.model';
import { DiscountDetailsService } from './discount-details.service';

@Component({
  templateUrl: './discount-details-delete-dialog.component.html',
})
export class DiscountDetailsDeleteDialogComponent {
  discountDetails?: IDiscountDetails;

  constructor(
    protected discountDetailsService: DiscountDetailsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.discountDetailsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('discountDetailsListModification');
      this.activeModal.close();
    });
  }
}
