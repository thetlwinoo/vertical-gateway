import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductSet } from 'app/shared/model/vscommerce/product-set.model';

@Component({
  selector: 'jhi-product-set-detail',
  templateUrl: './product-set-detail.component.html',
})
export class ProductSetDetailComponent implements OnInit {
  productSet: IProductSet | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productSet }) => (this.productSet = productSet));
  }

  previousState(): void {
    window.history.back();
  }
}
