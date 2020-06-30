import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { PaymentMethodsComponent } from './payment-methods.component';
import { PaymentMethodsDetailComponent } from './payment-methods-detail.component';
import { PaymentMethodsUpdateComponent } from './payment-methods-update.component';
import { PaymentMethodsDeleteDialogComponent } from './payment-methods-delete-dialog.component';
import { paymentMethodsRoute } from './payment-methods.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(paymentMethodsRoute)],
  declarations: [
    PaymentMethodsComponent,
    PaymentMethodsDetailComponent,
    PaymentMethodsUpdateComponent,
    PaymentMethodsDeleteDialogComponent,
  ],
  entryComponents: [PaymentMethodsDeleteDialogComponent],
})
export class VscommercePaymentMethodsModule {}
