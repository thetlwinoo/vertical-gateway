import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IStockItemHoldings } from 'app/shared/model/vscommerce/stock-item-holdings.model';
import { StockItemHoldingsService } from './stock-item-holdings.service';
import { StockItemHoldingsDeleteDialogComponent } from './stock-item-holdings-delete-dialog.component';

@Component({
  selector: 'jhi-stock-item-holdings',
  templateUrl: './stock-item-holdings.component.html',
})
export class StockItemHoldingsComponent implements OnInit, OnDestroy {
  stockItemHoldings?: IStockItemHoldings[];
  eventSubscriber?: Subscription;

  constructor(
    protected stockItemHoldingsService: StockItemHoldingsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.stockItemHoldingsService.query().subscribe((res: HttpResponse<IStockItemHoldings[]>) => (this.stockItemHoldings = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInStockItemHoldings();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IStockItemHoldings): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInStockItemHoldings(): void {
    this.eventSubscriber = this.eventManager.subscribe('stockItemHoldingsListModification', () => this.loadAll());
  }

  delete(stockItemHoldings: IStockItemHoldings): void {
    const modalRef = this.modalService.open(StockItemHoldingsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.stockItemHoldings = stockItemHoldings;
  }
}
