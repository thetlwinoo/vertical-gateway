import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { CreditCardTypeComponent } from './credit-card-type.component';
import { CreditCardTypeDetailComponent } from './credit-card-type-detail.component';
import { CreditCardTypeUpdateComponent } from './credit-card-type-update.component';
import { CreditCardTypeDeleteDialogComponent } from './credit-card-type-delete-dialog.component';
import { creditCardTypeRoute } from './credit-card-type.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(creditCardTypeRoute)],
  declarations: [
    CreditCardTypeComponent,
    CreditCardTypeDetailComponent,
    CreditCardTypeUpdateComponent,
    CreditCardTypeDeleteDialogComponent,
  ],
  entryComponents: [CreditCardTypeDeleteDialogComponent],
})
export class VscommerceCreditCardTypeModule {}
