import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStockItems } from 'app/shared/model/vscommerce/stock-items.model';

@Component({
  selector: 'jhi-stock-items-detail',
  templateUrl: './stock-items-detail.component.html',
})
export class StockItemsDetailComponent implements OnInit {
  stockItems: IStockItems | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ stockItems }) => (this.stockItems = stockItems));
  }

  previousState(): void {
    window.history.back();
  }
}
