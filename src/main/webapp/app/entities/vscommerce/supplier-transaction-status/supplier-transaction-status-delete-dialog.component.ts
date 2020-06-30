import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISupplierTransactionStatus } from 'app/shared/model/vscommerce/supplier-transaction-status.model';
import { SupplierTransactionStatusService } from './supplier-transaction-status.service';

@Component({
  templateUrl: './supplier-transaction-status-delete-dialog.component.html',
})
export class SupplierTransactionStatusDeleteDialogComponent {
  supplierTransactionStatus?: ISupplierTransactionStatus;

  constructor(
    protected supplierTransactionStatusService: SupplierTransactionStatusService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.supplierTransactionStatusService.delete(id).subscribe(() => {
      this.eventManager.broadcast('supplierTransactionStatusListModification');
      this.activeModal.close();
    });
  }
}
