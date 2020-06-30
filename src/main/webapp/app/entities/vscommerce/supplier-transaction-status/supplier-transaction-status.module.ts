import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { SupplierTransactionStatusComponent } from './supplier-transaction-status.component';
import { SupplierTransactionStatusDetailComponent } from './supplier-transaction-status-detail.component';
import { SupplierTransactionStatusUpdateComponent } from './supplier-transaction-status-update.component';
import { SupplierTransactionStatusDeleteDialogComponent } from './supplier-transaction-status-delete-dialog.component';
import { supplierTransactionStatusRoute } from './supplier-transaction-status.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(supplierTransactionStatusRoute)],
  declarations: [
    SupplierTransactionStatusComponent,
    SupplierTransactionStatusDetailComponent,
    SupplierTransactionStatusUpdateComponent,
    SupplierTransactionStatusDeleteDialogComponent,
  ],
  entryComponents: [SupplierTransactionStatusDeleteDialogComponent],
})
export class VscommerceSupplierTransactionStatusModule {}
