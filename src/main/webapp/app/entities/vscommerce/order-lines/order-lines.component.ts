import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IOrderLines } from 'app/shared/model/vscommerce/order-lines.model';
import { OrderLinesService } from './order-lines.service';
import { OrderLinesDeleteDialogComponent } from './order-lines-delete-dialog.component';

@Component({
  selector: 'jhi-order-lines',
  templateUrl: './order-lines.component.html',
})
export class OrderLinesComponent implements OnInit, OnDestroy {
  orderLines?: IOrderLines[];
  eventSubscriber?: Subscription;

  constructor(
    protected orderLinesService: OrderLinesService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.orderLinesService.query().subscribe((res: HttpResponse<IOrderLines[]>) => (this.orderLines = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInOrderLines();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IOrderLines): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInOrderLines(): void {
    this.eventSubscriber = this.eventManager.subscribe('orderLinesListModification', () => this.loadAll());
  }

  delete(orderLines: IOrderLines): void {
    const modalRef = this.modalService.open(OrderLinesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.orderLines = orderLines;
  }
}
