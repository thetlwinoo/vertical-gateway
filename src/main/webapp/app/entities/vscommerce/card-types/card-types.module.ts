import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { CardTypesComponent } from './card-types.component';
import { CardTypesDetailComponent } from './card-types-detail.component';
import { CardTypesUpdateComponent } from './card-types-update.component';
import { CardTypesDeleteDialogComponent } from './card-types-delete-dialog.component';
import { cardTypesRoute } from './card-types.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(cardTypesRoute)],
  declarations: [CardTypesComponent, CardTypesDetailComponent, CardTypesUpdateComponent, CardTypesDeleteDialogComponent],
  entryComponents: [CardTypesDeleteDialogComponent],
})
export class VscommerceCardTypesModule {}
