import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPurchaseOrderLines } from 'app/shared/model/vscommerce/purchase-order-lines.model';
import { PurchaseOrderLinesService } from './purchase-order-lines.service';

@Component({
  templateUrl: './purchase-order-lines-delete-dialog.component.html',
})
export class PurchaseOrderLinesDeleteDialogComponent {
  purchaseOrderLines?: IPurchaseOrderLines;

  constructor(
    protected purchaseOrderLinesService: PurchaseOrderLinesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.purchaseOrderLinesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('purchaseOrderLinesListModification');
      this.activeModal.close();
    });
  }
}
