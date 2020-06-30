import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICurrencyRate } from 'app/shared/model/vscommerce/currency-rate.model';

@Component({
  selector: 'jhi-currency-rate-detail',
  templateUrl: './currency-rate-detail.component.html',
})
export class CurrencyRateDetailComponent implements OnInit {
  currencyRate: ICurrencyRate | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ currencyRate }) => (this.currencyRate = currencyRate));
  }

  previousState(): void {
    window.history.back();
  }
}
