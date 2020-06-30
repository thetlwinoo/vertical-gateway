import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductSetDetailPrice } from 'app/shared/model/vscommerce/product-set-detail-price.model';

@Component({
  selector: 'jhi-product-set-detail-price-detail',
  templateUrl: './product-set-detail-price-detail.component.html',
})
export class ProductSetDetailPriceDetailComponent implements OnInit {
  productSetDetailPrice: IProductSetDetailPrice | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productSetDetailPrice }) => (this.productSetDetailPrice = productSetDetailPrice));
  }

  previousState(): void {
    window.history.back();
  }
}
