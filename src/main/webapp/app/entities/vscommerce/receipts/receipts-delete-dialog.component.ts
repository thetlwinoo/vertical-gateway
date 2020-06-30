import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReceipts } from 'app/shared/model/vscommerce/receipts.model';
import { ReceiptsService } from './receipts.service';

@Component({
  templateUrl: './receipts-delete-dialog.component.html',
})
export class ReceiptsDeleteDialogComponent {
  receipts?: IReceipts;

  constructor(protected receiptsService: ReceiptsService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.receiptsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('receiptsListModification');
      this.activeModal.close();
    });
  }
}
