import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { CustomerPaymentBankTransferComponent } from './customer-payment-bank-transfer.component';
import { CustomerPaymentBankTransferDetailComponent } from './customer-payment-bank-transfer-detail.component';
import { CustomerPaymentBankTransferUpdateComponent } from './customer-payment-bank-transfer-update.component';
import { CustomerPaymentBankTransferDeleteDialogComponent } from './customer-payment-bank-transfer-delete-dialog.component';
import { customerPaymentBankTransferRoute } from './customer-payment-bank-transfer.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(customerPaymentBankTransferRoute)],
  declarations: [
    CustomerPaymentBankTransferComponent,
    CustomerPaymentBankTransferDetailComponent,
    CustomerPaymentBankTransferUpdateComponent,
    CustomerPaymentBankTransferDeleteDialogComponent,
  ],
  entryComponents: [CustomerPaymentBankTransferDeleteDialogComponent],
})
export class VscommerceCustomerPaymentBankTransferModule {}
