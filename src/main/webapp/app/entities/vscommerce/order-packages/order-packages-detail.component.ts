import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IOrderPackages } from 'app/shared/model/vscommerce/order-packages.model';

@Component({
  selector: 'jhi-order-packages-detail',
  templateUrl: './order-packages-detail.component.html',
})
export class OrderPackagesDetailComponent implements OnInit {
  orderPackages: IOrderPackages | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ orderPackages }) => (this.orderPackages = orderPackages));
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
