import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { ProductCatalogComponent } from './product-catalog.component';
import { ProductCatalogDetailComponent } from './product-catalog-detail.component';
import { ProductCatalogUpdateComponent } from './product-catalog-update.component';
import { ProductCatalogDeleteDialogComponent } from './product-catalog-delete-dialog.component';
import { productCatalogRoute } from './product-catalog.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(productCatalogRoute)],
  declarations: [
    ProductCatalogComponent,
    ProductCatalogDetailComponent,
    ProductCatalogUpdateComponent,
    ProductCatalogDeleteDialogComponent,
  ],
  entryComponents: [ProductCatalogDeleteDialogComponent],
})
export class VscommerceProductCatalogModule {}
