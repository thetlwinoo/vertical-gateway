import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStockItemTransactions } from 'app/shared/model/vscommerce/stock-item-transactions.model';
import { StockItemTransactionsService } from './stock-item-transactions.service';

@Component({
  templateUrl: './stock-item-transactions-delete-dialog.component.html',
})
export class StockItemTransactionsDeleteDialogComponent {
  stockItemTransactions?: IStockItemTransactions;

  constructor(
    protected stockItemTransactionsService: StockItemTransactionsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.stockItemTransactionsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('stockItemTransactionsListModification');
      this.activeModal.close();
    });
  }
}
