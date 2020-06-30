import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { ProductAttributeSetComponent } from './product-attribute-set.component';
import { ProductAttributeSetDetailComponent } from './product-attribute-set-detail.component';
import { ProductAttributeSetUpdateComponent } from './product-attribute-set-update.component';
import { ProductAttributeSetDeleteDialogComponent } from './product-attribute-set-delete-dialog.component';
import { productAttributeSetRoute } from './product-attribute-set.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(productAttributeSetRoute)],
  declarations: [
    ProductAttributeSetComponent,
    ProductAttributeSetDetailComponent,
    ProductAttributeSetUpdateComponent,
    ProductAttributeSetDeleteDialogComponent,
  ],
  entryComponents: [ProductAttributeSetDeleteDialogComponent],
})
export class VscommerceProductAttributeSetModule {}
