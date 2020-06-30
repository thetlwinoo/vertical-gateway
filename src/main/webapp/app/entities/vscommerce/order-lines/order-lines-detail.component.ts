import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrderLines } from 'app/shared/model/vscommerce/order-lines.model';

@Component({
  selector: 'jhi-order-lines-detail',
  templateUrl: './order-lines-detail.component.html',
})
export class OrderLinesDetailComponent implements OnInit {
  orderLines: IOrderLines | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ orderLines }) => (this.orderLines = orderLines));
  }

  previousState(): void {
    window.history.back();
  }
}
