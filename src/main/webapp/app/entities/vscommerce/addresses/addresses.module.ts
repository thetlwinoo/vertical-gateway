import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { AddressesComponent } from './addresses.component';
import { AddressesDetailComponent } from './addresses-detail.component';
import { AddressesUpdateComponent } from './addresses-update.component';
import { AddressesDeleteDialogComponent } from './addresses-delete-dialog.component';
import { addressesRoute } from './addresses.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(addressesRoute)],
  declarations: [AddressesComponent, AddressesDetailComponent, AddressesUpdateComponent, AddressesDeleteDialogComponent],
  entryComponents: [AddressesDeleteDialogComponent],
})
export class VscommerceAddressesModule {}
