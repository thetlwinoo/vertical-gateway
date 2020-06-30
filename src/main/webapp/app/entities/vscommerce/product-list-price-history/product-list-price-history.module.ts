import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { ProductListPriceHistoryComponent } from './product-list-price-history.component';
import { ProductListPriceHistoryDetailComponent } from './product-list-price-history-detail.component';
import { ProductListPriceHistoryUpdateComponent } from './product-list-price-history-update.component';
import { ProductListPriceHistoryDeleteDialogComponent } from './product-list-price-history-delete-dialog.component';
import { productListPriceHistoryRoute } from './product-list-price-history.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(productListPriceHistoryRoute)],
  declarations: [
    ProductListPriceHistoryComponent,
    ProductListPriceHistoryDetailComponent,
    ProductListPriceHistoryUpdateComponent,
    ProductListPriceHistoryDeleteDialogComponent,
  ],
  entryComponents: [ProductListPriceHistoryDeleteDialogComponent],
})
export class VscommerceProductListPriceHistoryModule {}
