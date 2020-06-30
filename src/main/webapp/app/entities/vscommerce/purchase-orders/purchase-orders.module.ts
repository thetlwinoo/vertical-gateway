import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { PurchaseOrdersComponent } from './purchase-orders.component';
import { PurchaseOrdersDetailComponent } from './purchase-orders-detail.component';
import { PurchaseOrdersUpdateComponent } from './purchase-orders-update.component';
import { PurchaseOrdersDeleteDialogComponent } from './purchase-orders-delete-dialog.component';
import { purchaseOrdersRoute } from './purchase-orders.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(purchaseOrdersRoute)],
  declarations: [
    PurchaseOrdersComponent,
    PurchaseOrdersDetailComponent,
    PurchaseOrdersUpdateComponent,
    PurchaseOrdersDeleteDialogComponent,
  ],
  entryComponents: [PurchaseOrdersDeleteDialogComponent],
})
export class VscommercePurchaseOrdersModule {}
