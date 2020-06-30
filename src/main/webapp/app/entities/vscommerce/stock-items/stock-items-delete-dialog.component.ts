import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStockItems } from 'app/shared/model/vscommerce/stock-items.model';
import { StockItemsService } from './stock-items.service';

@Component({
  templateUrl: './stock-items-delete-dialog.component.html',
})
export class StockItemsDeleteDialogComponent {
  stockItems?: IStockItems;

  constructor(
    protected stockItemsService: StockItemsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.stockItemsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('stockItemsListModification');
      this.activeModal.close();
    });
  }
}
