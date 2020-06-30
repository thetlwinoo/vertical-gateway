import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITaxClass } from 'app/shared/model/vscommerce/tax-class.model';
import { TaxClassService } from './tax-class.service';

@Component({
  templateUrl: './tax-class-delete-dialog.component.html',
})
export class TaxClassDeleteDialogComponent {
  taxClass?: ITaxClass;

  constructor(protected taxClassService: TaxClassService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.taxClassService.delete(id).subscribe(() => {
      this.eventManager.broadcast('taxClassListModification');
      this.activeModal.close();
    });
  }
}
