import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInvoiceLines } from 'app/shared/model/vscommerce/invoice-lines.model';
import { InvoiceLinesService } from './invoice-lines.service';

@Component({
  templateUrl: './invoice-lines-delete-dialog.component.html',
})
export class InvoiceLinesDeleteDialogComponent {
  invoiceLines?: IInvoiceLines;

  constructor(
    protected invoiceLinesService: InvoiceLinesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.invoiceLinesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('invoiceLinesListModification');
      this.activeModal.close();
    });
  }
}
