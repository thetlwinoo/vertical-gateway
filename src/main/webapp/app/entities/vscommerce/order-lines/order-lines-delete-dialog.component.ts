import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrderLines } from 'app/shared/model/vscommerce/order-lines.model';
import { OrderLinesService } from './order-lines.service';

@Component({
  templateUrl: './order-lines-delete-dialog.component.html',
})
export class OrderLinesDeleteDialogComponent {
  orderLines?: IOrderLines;

  constructor(
    protected orderLinesService: OrderLinesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.orderLinesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('orderLinesListModification');
      this.activeModal.close();
    });
  }
}
