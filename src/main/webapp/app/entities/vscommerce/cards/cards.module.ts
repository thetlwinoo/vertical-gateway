import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { CardsComponent } from './cards.component';
import { CardsDetailComponent } from './cards-detail.component';
import { CardsUpdateComponent } from './cards-update.component';
import { CardsDeleteDialogComponent } from './cards-delete-dialog.component';
import { cardsRoute } from './cards.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(cardsRoute)],
  declarations: [CardsComponent, CardsDetailComponent, CardsUpdateComponent, CardsDeleteDialogComponent],
  entryComponents: [CardsDeleteDialogComponent],
})
export class VscommerceCardsModule {}
