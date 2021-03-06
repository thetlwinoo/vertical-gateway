import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IOrderPackages } from 'app/shared/model/vscommerce/order-packages.model';
import { OrderPackagesService } from './order-packages.service';
import { OrderPackagesDeleteDialogComponent } from './order-packages-delete-dialog.component';

@Component({
  selector: 'jhi-order-packages',
  templateUrl: './order-packages.component.html',
})
export class OrderPackagesComponent implements OnInit, OnDestroy {
  orderPackages?: IOrderPackages[];
  eventSubscriber?: Subscription;

  constructor(
    protected orderPackagesService: OrderPackagesService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.orderPackagesService.query().subscribe((res: HttpResponse<IOrderPackages[]>) => (this.orderPackages = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInOrderPackages();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IOrderPackages): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInOrderPackages(): void {
    this.eventSubscriber = this.eventManager.subscribe('orderPackagesListModification', () => this.loadAll());
  }

  delete(orderPackages: IOrderPackages): void {
    const modalRef = this.modalService.open(OrderPackagesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.orderPackages = orderPackages;
  }
}
