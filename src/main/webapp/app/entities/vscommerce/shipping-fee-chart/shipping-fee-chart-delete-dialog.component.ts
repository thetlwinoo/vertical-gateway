import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IShippingFeeChart } from 'app/shared/model/vscommerce/shipping-fee-chart.model';
import { ShippingFeeChartService } from './shipping-fee-chart.service';

@Component({
  templateUrl: './shipping-fee-chart-delete-dialog.component.html',
})
export class ShippingFeeChartDeleteDialogComponent {
  shippingFeeChart?: IShippingFeeChart;

  constructor(
    protected shippingFeeChartService: ShippingFeeChartService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.shippingFeeChartService.delete(id).subscribe(() => {
      this.eventManager.broadcast('shippingFeeChartListModification');
      this.activeModal.close();
    });
  }
}
