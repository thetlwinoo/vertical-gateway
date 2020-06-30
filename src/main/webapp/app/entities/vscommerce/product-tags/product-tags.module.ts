import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { ProductTagsComponent } from './product-tags.component';
import { ProductTagsDetailComponent } from './product-tags-detail.component';
import { ProductTagsUpdateComponent } from './product-tags-update.component';
import { ProductTagsDeleteDialogComponent } from './product-tags-delete-dialog.component';
import { productTagsRoute } from './product-tags.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(productTagsRoute)],
  declarations: [ProductTagsComponent, ProductTagsDetailComponent, ProductTagsUpdateComponent, ProductTagsDeleteDialogComponent],
  entryComponents: [ProductTagsDeleteDialogComponent],
})
export class VscommerceProductTagsModule {}
