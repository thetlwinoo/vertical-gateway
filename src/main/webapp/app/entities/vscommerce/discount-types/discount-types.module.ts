import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { DiscountTypesComponent } from './discount-types.component';
import { DiscountTypesDetailComponent } from './discount-types-detail.component';
import { DiscountTypesUpdateComponent } from './discount-types-update.component';
import { DiscountTypesDeleteDialogComponent } from './discount-types-delete-dialog.component';
import { discountTypesRoute } from './discount-types.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(discountTypesRoute)],
  declarations: [DiscountTypesComponent, DiscountTypesDetailComponent, DiscountTypesUpdateComponent, DiscountTypesDeleteDialogComponent],
  entryComponents: [DiscountTypesDeleteDialogComponent],
})
export class VscommerceDiscountTypesModule {}
