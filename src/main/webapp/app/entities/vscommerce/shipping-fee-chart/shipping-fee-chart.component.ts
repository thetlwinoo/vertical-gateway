import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IShippingFeeChart } from 'app/shared/model/vscommerce/shipping-fee-chart.model';
import { ShippingFeeChartService } from './shipping-fee-chart.service';
import { ShippingFeeChartDeleteDialogComponent } from './shipping-fee-chart-delete-dialog.component';

@Component({
  selector: 'jhi-shipping-fee-chart',
  templateUrl: './shipping-fee-chart.component.html',
})
export class ShippingFeeChartComponent implements OnInit, OnDestroy {
  shippingFeeCharts?: IShippingFeeChart[];
  eventSubscriber?: Subscription;

  constructor(
    protected shippingFeeChartService: ShippingFeeChartService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.shippingFeeChartService.query().subscribe((res: HttpResponse<IShippingFeeChart[]>) => (this.shippingFeeCharts = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInShippingFeeCharts();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IShippingFeeChart): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInShippingFeeCharts(): void {
    this.eventSubscriber = this.eventManager.subscribe('shippingFeeChartListModification', () => this.loadAll());
  }

  delete(shippingFeeChart: IShippingFeeChart): void {
    const modalRef = this.modalService.open(ShippingFeeChartDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.shippingFeeChart = shippingFeeChart;
  }
}
