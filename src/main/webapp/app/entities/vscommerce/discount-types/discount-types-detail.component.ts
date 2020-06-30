import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDiscountTypes } from 'app/shared/model/vscommerce/discount-types.model';

@Component({
  selector: 'jhi-discount-types-detail',
  templateUrl: './discount-types-detail.component.html',
})
export class DiscountTypesDetailComponent implements OnInit {
  discountTypes: IDiscountTypes | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ discountTypes }) => (this.discountTypes = discountTypes));
  }

  previousState(): void {
    window.history.back();
  }
}
