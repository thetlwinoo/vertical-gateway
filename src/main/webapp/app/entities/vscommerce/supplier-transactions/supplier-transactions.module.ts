import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { SupplierTransactionsComponent } from './supplier-transactions.component';
import { SupplierTransactionsDetailComponent } from './supplier-transactions-detail.component';
import { SupplierTransactionsUpdateComponent } from './supplier-transactions-update.component';
import { SupplierTransactionsDeleteDialogComponent } from './supplier-transactions-delete-dialog.component';
import { supplierTransactionsRoute } from './supplier-transactions.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(supplierTransactionsRoute)],
  declarations: [
    SupplierTransactionsComponent,
    SupplierTransactionsDetailComponent,
    SupplierTransactionsUpdateComponent,
    SupplierTransactionsDeleteDialogComponent,
  ],
  entryComponents: [SupplierTransactionsDeleteDialogComponent],
})
export class VscommerceSupplierTransactionsModule {}
