import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { CustomerPaymentPaypalComponent } from './customer-payment-paypal.component';
import { CustomerPaymentPaypalDetailComponent } from './customer-payment-paypal-detail.component';
import { CustomerPaymentPaypalUpdateComponent } from './customer-payment-paypal-update.component';
import { CustomerPaymentPaypalDeleteDialogComponent } from './customer-payment-paypal-delete-dialog.component';
import { customerPaymentPaypalRoute } from './customer-payment-paypal.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(customerPaymentPaypalRoute)],
  declarations: [
    CustomerPaymentPaypalComponent,
    CustomerPaymentPaypalDetailComponent,
    CustomerPaymentPaypalUpdateComponent,
    CustomerPaymentPaypalDeleteDialogComponent,
  ],
  entryComponents: [CustomerPaymentPaypalDeleteDialogComponent],
})
export class VscommerceCustomerPaymentPaypalModule {}
