import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStockItemHoldings } from 'app/shared/model/vscommerce/stock-item-holdings.model';
import { StockItemHoldingsService } from './stock-item-holdings.service';

@Component({
  templateUrl: './stock-item-holdings-delete-dialog.component.html',
})
export class StockItemHoldingsDeleteDialogComponent {
  stockItemHoldings?: IStockItemHoldings;

  constructor(
    protected stockItemHoldingsService: StockItemHoldingsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.stockItemHoldingsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('stockItemHoldingsListModification');
      this.activeModal.close();
    });
  }
}
