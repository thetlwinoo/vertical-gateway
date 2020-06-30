import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductBrand } from 'app/shared/model/vscommerce/product-brand.model';

@Component({
  selector: 'jhi-product-brand-detail',
  templateUrl: './product-brand-detail.component.html',
})
export class ProductBrandDetailComponent implements OnInit {
  productBrand: IProductBrand | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productBrand }) => (this.productBrand = productBrand));
  }

  previousState(): void {
    window.history.back();
  }
}
