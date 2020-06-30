import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { WarrantyTypesComponent } from './warranty-types.component';
import { WarrantyTypesDetailComponent } from './warranty-types-detail.component';
import { WarrantyTypesUpdateComponent } from './warranty-types-update.component';
import { WarrantyTypesDeleteDialogComponent } from './warranty-types-delete-dialog.component';
import { warrantyTypesRoute } from './warranty-types.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(warrantyTypesRoute)],
  declarations: [WarrantyTypesComponent, WarrantyTypesDetailComponent, WarrantyTypesUpdateComponent, WarrantyTypesDeleteDialogComponent],
  entryComponents: [WarrantyTypesDeleteDialogComponent],
})
export class VscommerceWarrantyTypesModule {}
