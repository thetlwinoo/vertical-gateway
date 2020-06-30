import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductChoice } from 'app/shared/model/vscommerce/product-choice.model';

@Component({
  selector: 'jhi-product-choice-detail',
  templateUrl: './product-choice-detail.component.html',
})
export class ProductChoiceDetailComponent implements OnInit {
  productChoice: IProductChoice | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productChoice }) => (this.productChoice = productChoice));
  }

  previousState(): void {
    window.history.back();
  }
}
