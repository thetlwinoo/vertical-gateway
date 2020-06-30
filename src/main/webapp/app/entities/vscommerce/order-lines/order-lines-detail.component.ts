import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IOrderLines } from 'app/shared/model/vscommerce/order-lines.model';

@Component({
  selector: 'jhi-order-lines-detail',
  templateUrl: './order-lines-detail.component.html',
})
export class OrderLinesDetailComponent implements OnInit {
  orderLines: IOrderLines | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ orderLines }) => (this.orderLines = orderLines));
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
