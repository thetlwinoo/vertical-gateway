import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductAttributeSet } from 'app/shared/model/vscommerce/product-attribute-set.model';

@Component({
  selector: 'jhi-product-attribute-set-detail',
  templateUrl: './product-attribute-set-detail.component.html',
})
export class ProductAttributeSetDetailComponent implements OnInit {
  productAttributeSet: IProductAttributeSet | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productAttributeSet }) => (this.productAttributeSet = productAttributeSet));
  }

  previousState(): void {
    window.history.back();
  }
}
