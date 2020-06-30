import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IReceipts } from 'app/shared/model/vscommerce/receipts.model';
import { ReceiptsService } from './receipts.service';
import { ReceiptsDeleteDialogComponent } from './receipts-delete-dialog.component';

@Component({
  selector: 'jhi-receipts',
  templateUrl: './receipts.component.html',
})
export class ReceiptsComponent implements OnInit, OnDestroy {
  receipts?: IReceipts[];
  eventSubscriber?: Subscription;

  constructor(protected receiptsService: ReceiptsService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.receiptsService.query().subscribe((res: HttpResponse<IReceipts[]>) => (this.receipts = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInReceipts();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IReceipts): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInReceipts(): void {
    this.eventSubscriber = this.eventManager.subscribe('receiptsListModification', () => this.loadAll());
  }

  delete(receipts: IReceipts): void {
    const modalRef = this.modalService.open(ReceiptsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.receipts = receipts;
  }
}
