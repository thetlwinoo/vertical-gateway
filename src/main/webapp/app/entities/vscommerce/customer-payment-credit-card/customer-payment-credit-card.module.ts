import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { CustomerPaymentCreditCardComponent } from './customer-payment-credit-card.component';
import { CustomerPaymentCreditCardDetailComponent } from './customer-payment-credit-card-detail.component';
import { CustomerPaymentCreditCardUpdateComponent } from './customer-payment-credit-card-update.component';
import { CustomerPaymentCreditCardDeleteDialogComponent } from './customer-payment-credit-card-delete-dialog.component';
import { customerPaymentCreditCardRoute } from './customer-payment-credit-card.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(customerPaymentCreditCardRoute)],
  declarations: [
    CustomerPaymentCreditCardComponent,
    CustomerPaymentCreditCardDetailComponent,
    CustomerPaymentCreditCardUpdateComponent,
    CustomerPaymentCreditCardDeleteDialogComponent,
  ],
  entryComponents: [CustomerPaymentCreditCardDeleteDialogComponent],
})
export class VscommerceCustomerPaymentCreditCardModule {}
