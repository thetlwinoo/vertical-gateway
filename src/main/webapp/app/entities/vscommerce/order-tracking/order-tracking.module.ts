import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { OrderTrackingComponent } from './order-tracking.component';
import { OrderTrackingDetailComponent } from './order-tracking-detail.component';
import { OrderTrackingUpdateComponent } from './order-tracking-update.component';
import { OrderTrackingDeleteDialogComponent } from './order-tracking-delete-dialog.component';
import { orderTrackingRoute } from './order-tracking.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(orderTrackingRoute)],
  declarations: [OrderTrackingComponent, OrderTrackingDetailComponent, OrderTrackingUpdateComponent, OrderTrackingDeleteDialogComponent],
  entryComponents: [OrderTrackingDeleteDialogComponent],
})
export class VscommerceOrderTrackingModule {}
