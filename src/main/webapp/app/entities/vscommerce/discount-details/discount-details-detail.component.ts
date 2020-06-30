import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDiscountDetails } from 'app/shared/model/vscommerce/discount-details.model';

@Component({
  selector: 'jhi-discount-details-detail',
  templateUrl: './discount-details-detail.component.html',
})
export class DiscountDetailsDetailComponent implements OnInit {
  discountDetails: IDiscountDetails | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ discountDetails }) => (this.discountDetails = discountDetails));
  }

  previousState(): void {
    window.history.back();
  }
}
