import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICreditCardType } from 'app/shared/model/vscommerce/credit-card-type.model';
import { CreditCardTypeService } from './credit-card-type.service';

@Component({
  templateUrl: './credit-card-type-delete-dialog.component.html',
})
export class CreditCardTypeDeleteDialogComponent {
  creditCardType?: ICreditCardType;

  constructor(
    protected creditCardTypeService: CreditCardTypeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.creditCardTypeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('creditCardTypeListModification');
      this.activeModal.close();
    });
  }
}
