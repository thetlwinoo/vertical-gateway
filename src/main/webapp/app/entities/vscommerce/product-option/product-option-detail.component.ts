import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductOption } from 'app/shared/model/vscommerce/product-option.model';

@Component({
  selector: 'jhi-product-option-detail',
  templateUrl: './product-option-detail.component.html',
})
export class ProductOptionDetailComponent implements OnInit {
  productOption: IProductOption | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productOption }) => (this.productOption = productOption));
  }

  previousState(): void {
    window.history.back();
  }
}
