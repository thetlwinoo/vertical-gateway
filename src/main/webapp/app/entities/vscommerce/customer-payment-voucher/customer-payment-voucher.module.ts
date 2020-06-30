import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { CustomerPaymentVoucherComponent } from './customer-payment-voucher.component';
import { CustomerPaymentVoucherDetailComponent } from './customer-payment-voucher-detail.component';
import { CustomerPaymentVoucherUpdateComponent } from './customer-payment-voucher-update.component';
import { CustomerPaymentVoucherDeleteDialogComponent } from './customer-payment-voucher-delete-dialog.component';
import { customerPaymentVoucherRoute } from './customer-payment-voucher.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(customerPaymentVoucherRoute)],
  declarations: [
    CustomerPaymentVoucherComponent,
    CustomerPaymentVoucherDetailComponent,
    CustomerPaymentVoucherUpdateComponent,
    CustomerPaymentVoucherDeleteDialogComponent,
  ],
  entryComponents: [CustomerPaymentVoucherDeleteDialogComponent],
})
export class VscommerceCustomerPaymentVoucherModule {}
