import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrderTracking } from 'app/shared/model/vscommerce/order-tracking.model';
import { OrderTrackingService } from './order-tracking.service';

@Component({
  templateUrl: './order-tracking-delete-dialog.component.html',
})
export class OrderTrackingDeleteDialogComponent {
  orderTracking?: IOrderTracking;

  constructor(
    protected orderTrackingService: OrderTrackingService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.orderTrackingService.delete(id).subscribe(() => {
      this.eventManager.broadcast('orderTrackingListModification');
      this.activeModal.close();
    });
  }
}
