import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IOrderTracking } from 'app/shared/model/vscommerce/order-tracking.model';
import { OrderTrackingService } from './order-tracking.service';
import { OrderTrackingDeleteDialogComponent } from './order-tracking-delete-dialog.component';

@Component({
  selector: 'jhi-order-tracking',
  templateUrl: './order-tracking.component.html',
})
export class OrderTrackingComponent implements OnInit, OnDestroy {
  orderTrackings?: IOrderTracking[];
  eventSubscriber?: Subscription;

  constructor(
    protected orderTrackingService: OrderTrackingService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.orderTrackingService.query().subscribe((res: HttpResponse<IOrderTracking[]>) => (this.orderTrackings = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInOrderTrackings();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IOrderTracking): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInOrderTrackings(): void {
    this.eventSubscriber = this.eventManager.subscribe('orderTrackingListModification', () => this.loadAll());
  }

  delete(orderTracking: IOrderTracking): void {
    const modalRef = this.modalService.open(OrderTrackingDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.orderTracking = orderTracking;
  }
}
