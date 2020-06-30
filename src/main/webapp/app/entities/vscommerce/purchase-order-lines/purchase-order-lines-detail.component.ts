import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPurchaseOrderLines } from 'app/shared/model/vscommerce/purchase-order-lines.model';

@Component({
  selector: 'jhi-purchase-order-lines-detail',
  templateUrl: './purchase-order-lines-detail.component.html',
})
export class PurchaseOrderLinesDetailComponent implements OnInit {
  purchaseOrderLines: IPurchaseOrderLines | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ purchaseOrderLines }) => (this.purchaseOrderLines = purchaseOrderLines));
  }

  previousState(): void {
    window.history.back();
  }
}
