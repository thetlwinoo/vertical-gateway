import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { SupplierCategoriesComponent } from './supplier-categories.component';
import { SupplierCategoriesDetailComponent } from './supplier-categories-detail.component';
import { SupplierCategoriesUpdateComponent } from './supplier-categories-update.component';
import { SupplierCategoriesDeleteDialogComponent } from './supplier-categories-delete-dialog.component';
import { supplierCategoriesRoute } from './supplier-categories.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(supplierCategoriesRoute)],
  declarations: [
    SupplierCategoriesComponent,
    SupplierCategoriesDetailComponent,
    SupplierCategoriesUpdateComponent,
    SupplierCategoriesDeleteDialogComponent,
  ],
  entryComponents: [SupplierCategoriesDeleteDialogComponent],
})
export class VscommerceSupplierCategoriesModule {}
