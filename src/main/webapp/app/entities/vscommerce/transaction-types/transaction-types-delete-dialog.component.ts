import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITransactionTypes } from 'app/shared/model/vscommerce/transaction-types.model';
import { TransactionTypesService } from './transaction-types.service';

@Component({
  templateUrl: './transaction-types-delete-dialog.component.html',
})
export class TransactionTypesDeleteDialogComponent {
  transactionTypes?: ITransactionTypes;

  constructor(
    protected transactionTypesService: TransactionTypesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.transactionTypesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('transactionTypesListModification');
      this.activeModal.close();
    });
  }
}
