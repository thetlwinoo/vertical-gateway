import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { SuppliersComponent } from './suppliers.component';
import { SuppliersDetailComponent } from './suppliers-detail.component';
import { SuppliersUpdateComponent } from './suppliers-update.component';
import { SuppliersDeleteDialogComponent } from './suppliers-delete-dialog.component';
import { suppliersRoute } from './suppliers.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(suppliersRoute)],
  declarations: [SuppliersComponent, SuppliersDetailComponent, SuppliersUpdateComponent, SuppliersDeleteDialogComponent],
  entryComponents: [SuppliersDeleteDialogComponent],
})
export class VscommerceSuppliersModule {}
