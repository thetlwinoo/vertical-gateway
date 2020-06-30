import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { ShippingFeeChartComponent } from './shipping-fee-chart.component';
import { ShippingFeeChartDetailComponent } from './shipping-fee-chart-detail.component';
import { ShippingFeeChartUpdateComponent } from './shipping-fee-chart-update.component';
import { ShippingFeeChartDeleteDialogComponent } from './shipping-fee-chart-delete-dialog.component';
import { shippingFeeChartRoute } from './shipping-fee-chart.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(shippingFeeChartRoute)],
  declarations: [
    ShippingFeeChartComponent,
    ShippingFeeChartDetailComponent,
    ShippingFeeChartUpdateComponent,
    ShippingFeeChartDeleteDialogComponent,
  ],
  entryComponents: [ShippingFeeChartDeleteDialogComponent],
})
export class VscommerceShippingFeeChartModule {}
