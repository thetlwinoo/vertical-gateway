import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductCatalog } from 'app/shared/model/vscommerce/product-catalog.model';

@Component({
  selector: 'jhi-product-catalog-detail',
  templateUrl: './product-catalog-detail.component.html',
})
export class ProductCatalogDetailComponent implements OnInit {
  productCatalog: IProductCatalog | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productCatalog }) => (this.productCatalog = productCatalog));
  }

  previousState(): void {
    window.history.back();
  }
}
