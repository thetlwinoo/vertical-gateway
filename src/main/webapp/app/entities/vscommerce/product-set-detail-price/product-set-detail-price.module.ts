import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { ProductSetDetailPriceComponent } from './product-set-detail-price.component';
import { ProductSetDetailPriceDetailComponent } from './product-set-detail-price-detail.component';
import { ProductSetDetailPriceUpdateComponent } from './product-set-detail-price-update.component';
import { ProductSetDetailPriceDeleteDialogComponent } from './product-set-detail-price-delete-dialog.component';
import { productSetDetailPriceRoute } from './product-set-detail-price.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(productSetDetailPriceRoute)],
  declarations: [
    ProductSetDetailPriceComponent,
    ProductSetDetailPriceDetailComponent,
    ProductSetDetailPriceUpdateComponent,
    ProductSetDetailPriceDeleteDialogComponent,
  ],
  entryComponents: [ProductSetDetailPriceDeleteDialogComponent],
})
export class VscommerceProductSetDetailPriceModule {}
