import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { DiscountDetailsComponent } from './discount-details.component';
import { DiscountDetailsDetailComponent } from './discount-details-detail.component';
import { DiscountDetailsUpdateComponent } from './discount-details-update.component';
import { DiscountDetailsDeleteDialogComponent } from './discount-details-delete-dialog.component';
import { discountDetailsRoute } from './discount-details.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(discountDetailsRoute)],
  declarations: [
    DiscountDetailsComponent,
    DiscountDetailsDetailComponent,
    DiscountDetailsUpdateComponent,
    DiscountDetailsDeleteDialogComponent,
  ],
  entryComponents: [DiscountDetailsDeleteDialogComponent],
})
export class VscommerceDiscountDetailsModule {}
