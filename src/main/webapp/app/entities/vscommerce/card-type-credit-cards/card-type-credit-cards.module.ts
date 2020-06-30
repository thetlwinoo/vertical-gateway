import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { CardTypeCreditCardsComponent } from './card-type-credit-cards.component';
import { CardTypeCreditCardsDetailComponent } from './card-type-credit-cards-detail.component';
import { CardTypeCreditCardsUpdateComponent } from './card-type-credit-cards-update.component';
import { CardTypeCreditCardsDeleteDialogComponent } from './card-type-credit-cards-delete-dialog.component';
import { cardTypeCreditCardsRoute } from './card-type-credit-cards.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(cardTypeCreditCardsRoute)],
  declarations: [
    CardTypeCreditCardsComponent,
    CardTypeCreditCardsDetailComponent,
    CardTypeCreditCardsUpdateComponent,
    CardTypeCreditCardsDeleteDialogComponent,
  ],
  entryComponents: [CardTypeCreditCardsDeleteDialogComponent],
})
export class VscommerceCardTypeCreditCardsModule {}
