import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IStockItemTransactions } from 'app/shared/model/vscommerce/stock-item-transactions.model';
import { StockItemTransactionsService } from './stock-item-transactions.service';
import { StockItemTransactionsDeleteDialogComponent } from './stock-item-transactions-delete-dialog.component';

@Component({
  selector: 'jhi-stock-item-transactions',
  templateUrl: './stock-item-transactions.component.html',
})
export class StockItemTransactionsComponent implements OnInit, OnDestroy {
  stockItemTransactions?: IStockItemTransactions[];
  eventSubscriber?: Subscription;

  constructor(
    protected stockItemTransactionsService: StockItemTransactionsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.stockItemTransactionsService
      .query()
      .subscribe((res: HttpResponse<IStockItemTransactions[]>) => (this.stockItemTransactions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInStockItemTransactions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IStockItemTransactions): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInStockItemTransactions(): void {
    this.eventSubscriber = this.eventManager.subscribe('stockItemTransactionsListModification', () => this.loadAll());
  }

  delete(stockItemTransactions: IStockItemTransactions): void {
    const modalRef = this.modalService.open(StockItemTransactionsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.stockItemTransactions = stockItemTransactions;
  }
}
