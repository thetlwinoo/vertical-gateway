import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductListPriceHistory } from 'app/shared/model/vscommerce/product-list-price-history.model';

@Component({
  selector: 'jhi-product-list-price-history-detail',
  templateUrl: './product-list-price-history-detail.component.html',
})
export class ProductListPriceHistoryDetailComponent implements OnInit {
  productListPriceHistory: IProductListPriceHistory | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productListPriceHistory }) => (this.productListPriceHistory = productListPriceHistory));
  }

  previousState(): void {
    window.history.back();
  }
}
