import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { ProductSetComponent } from './product-set.component';
import { ProductSetDetailComponent } from './product-set-detail.component';
import { ProductSetUpdateComponent } from './product-set-update.component';
import { ProductSetDeleteDialogComponent } from './product-set-delete-dialog.component';
import { productSetRoute } from './product-set.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(productSetRoute)],
  declarations: [ProductSetComponent, ProductSetDetailComponent, ProductSetUpdateComponent, ProductSetDeleteDialogComponent],
  entryComponents: [ProductSetDeleteDialogComponent],
})
export class VscommerceProductSetModule {}
