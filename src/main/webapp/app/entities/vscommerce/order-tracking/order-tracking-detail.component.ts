import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IOrderTracking } from 'app/shared/model/vscommerce/order-tracking.model';

@Component({
  selector: 'jhi-order-tracking-detail',
  templateUrl: './order-tracking-detail.component.html',
})
export class OrderTrackingDetailComponent implements OnInit {
  orderTracking: IOrderTracking | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ orderTracking }) => (this.orderTracking = orderTracking));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
