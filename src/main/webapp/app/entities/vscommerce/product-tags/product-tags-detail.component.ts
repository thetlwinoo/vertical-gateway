import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductTags } from 'app/shared/model/vscommerce/product-tags.model';

@Component({
  selector: 'jhi-product-tags-detail',
  templateUrl: './product-tags-detail.component.html',
})
export class ProductTagsDetailComponent implements OnInit {
  productTags: IProductTags | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productTags }) => (this.productTags = productTags));
  }

  previousState(): void {
    window.history.back();
  }
}
