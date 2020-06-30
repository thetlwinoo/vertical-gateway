import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { CustomerPaymentCreditCardExtendedComponent } from './customer-payment-credit-card-extended.component';
import { CustomerPaymentCreditCardExtendedDetailComponent } from './customer-payment-credit-card-extended-detail.component';
import { CustomerPaymentCreditCardExtendedUpdateComponent } from './customer-payment-credit-card-extended-update.component';
import { CustomerPaymentCreditCardExtendedDeleteDialogComponent } from './customer-payment-credit-card-extended-delete-dialog.component';
import { customerPaymentCreditCardExtendedRoute } from './customer-payment-credit-card-extended.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(customerPaymentCreditCardExtendedRoute)],
  declarations: [
    CustomerPaymentCreditCardExtendedComponent,
    CustomerPaymentCreditCardExtendedDetailComponent,
    CustomerPaymentCreditCardExtendedUpdateComponent,
    CustomerPaymentCreditCardExtendedDeleteDialogComponent,
  ],
  entryComponents: [CustomerPaymentCreditCardExtendedDeleteDialogComponent],
})
export class VscommerceCustomerPaymentCreditCardExtendedModule {}
