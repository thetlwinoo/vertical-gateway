import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPurchaseOrders } from 'app/shared/model/vscommerce/purchase-orders.model';
import { PurchaseOrdersService } from './purchase-orders.service';

@Component({
  templateUrl: './purchase-orders-delete-dialog.component.html',
})
export class PurchaseOrdersDeleteDialogComponent {
  purchaseOrders?: IPurchaseOrders;

  constructor(
    protected purchaseOrdersService: PurchaseOrdersService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.purchaseOrdersService.delete(id).subscribe(() => {
      this.eventManager.broadcast('purchaseOrdersListModification');
      this.activeModal.close();
    });
  }
}
