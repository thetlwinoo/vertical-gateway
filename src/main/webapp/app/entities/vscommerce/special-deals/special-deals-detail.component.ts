import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISpecialDeals } from 'app/shared/model/vscommerce/special-deals.model';

@Component({
  selector: 'jhi-special-deals-detail',
  templateUrl: './special-deals-detail.component.html',
})
export class SpecialDealsDetailComponent implements OnInit {
  specialDeals: ISpecialDeals | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ specialDeals }) => (this.specialDeals = specialDeals));
  }

  previousState(): void {
    window.history.back();
  }
}
