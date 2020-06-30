import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { CustomersComponent } from './customers.component';
import { CustomersDetailComponent } from './customers-detail.component';
import { CustomersUpdateComponent } from './customers-update.component';
import { CustomersDeleteDialogComponent } from './customers-delete-dialog.component';
import { customersRoute } from './customers.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(customersRoute)],
  declarations: [CustomersComponent, CustomersDetailComponent, CustomersUpdateComponent, CustomersDeleteDialogComponent],
  entryComponents: [CustomersDeleteDialogComponent],
})
export class VscommerceCustomersModule {}
