import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { DiscountComponent } from './discount.component';
import { DiscountDetailComponent } from './discount-detail.component';
import { DiscountUpdateComponent } from './discount-update.component';
import { DiscountDeleteDialogComponent } from './discount-delete-dialog.component';
import { discountRoute } from './discount.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(discountRoute)],
  declarations: [DiscountComponent, DiscountDetailComponent, DiscountUpdateComponent, DiscountDeleteDialogComponent],
  entryComponents: [DiscountDeleteDialogComponent],
})
export class VscommerceDiscountModule {}
