import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IShippingFeeChart } from 'app/shared/model/vscommerce/shipping-fee-chart.model';

@Component({
  selector: 'jhi-shipping-fee-chart-detail',
  templateUrl: './shipping-fee-chart-detail.component.html',
})
export class ShippingFeeChartDetailComponent implements OnInit {
  shippingFeeChart: IShippingFeeChart | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ shippingFeeChart }) => (this.shippingFeeChart = shippingFeeChart));
  }

  previousState(): void {
    window.history.back();
  }
}
