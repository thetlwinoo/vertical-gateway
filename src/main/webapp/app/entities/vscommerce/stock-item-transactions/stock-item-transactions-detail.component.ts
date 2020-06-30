import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStockItemTransactions } from 'app/shared/model/vscommerce/stock-item-transactions.model';

@Component({
  selector: 'jhi-stock-item-transactions-detail',
  templateUrl: './stock-item-transactions-detail.component.html',
})
export class StockItemTransactionsDetailComponent implements OnInit {
  stockItemTransactions: IStockItemTransactions | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ stockItemTransactions }) => (this.stockItemTransactions = stockItemTransactions));
  }

  previousState(): void {
    window.history.back();
  }
}
