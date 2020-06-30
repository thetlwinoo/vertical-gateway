import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUploadTransactions } from 'app/shared/model/vscommerce/upload-transactions.model';
import { UploadTransactionsService } from './upload-transactions.service';

@Component({
  templateUrl: './upload-transactions-delete-dialog.component.html',
})
export class UploadTransactionsDeleteDialogComponent {
  uploadTransactions?: IUploadTransactions;

  constructor(
    protected uploadTransactionsService: UploadTransactionsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.uploadTransactionsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('uploadTransactionsListModification');
      this.activeModal.close();
    });
  }
}
