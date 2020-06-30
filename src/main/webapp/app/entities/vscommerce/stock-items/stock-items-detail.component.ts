import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IStockItems } from 'app/shared/model/vscommerce/stock-items.model';

@Component({
  selector: 'jhi-stock-items-detail',
  templateUrl: './stock-items-detail.component.html',
})
export class StockItemsDetailComponent implements OnInit {
  stockItems: IStockItems | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ stockItems }) => (this.stockItems = stockItems));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
