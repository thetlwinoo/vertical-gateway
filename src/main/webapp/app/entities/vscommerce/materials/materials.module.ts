import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { MaterialsComponent } from './materials.component';
import { MaterialsDetailComponent } from './materials-detail.component';
import { MaterialsUpdateComponent } from './materials-update.component';
import { MaterialsDeleteDialogComponent } from './materials-delete-dialog.component';
import { materialsRoute } from './materials.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(materialsRoute)],
  declarations: [MaterialsComponent, MaterialsDetailComponent, MaterialsUpdateComponent, MaterialsDeleteDialogComponent],
  entryComponents: [MaterialsDeleteDialogComponent],
})
export class VscommerceMaterialsModule {}
