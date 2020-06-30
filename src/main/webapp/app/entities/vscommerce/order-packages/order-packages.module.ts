import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { OrderPackagesComponent } from './order-packages.component';
import { OrderPackagesDetailComponent } from './order-packages-detail.component';
import { OrderPackagesUpdateComponent } from './order-packages-update.component';
import { OrderPackagesDeleteDialogComponent } from './order-packages-delete-dialog.component';
import { orderPackagesRoute } from './order-packages.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(orderPackagesRoute)],
  declarations: [OrderPackagesComponent, OrderPackagesDetailComponent, OrderPackagesUpdateComponent, OrderPackagesDeleteDialogComponent],
  entryComponents: [OrderPackagesDeleteDialogComponent],
})
export class VscommerceOrderPackagesModule {}
