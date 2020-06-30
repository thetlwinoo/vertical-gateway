import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStockItemHoldings } from 'app/shared/model/vscommerce/stock-item-holdings.model';

@Component({
  selector: 'jhi-stock-item-holdings-detail',
  templateUrl: './stock-item-holdings-detail.component.html',
})
export class StockItemHoldingsDetailComponent implements OnInit {
  stockItemHoldings: IStockItemHoldings | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ stockItemHoldings }) => (this.stockItemHoldings = stockItemHoldings));
  }

  previousState(): void {
    window.history.back();
  }
}
