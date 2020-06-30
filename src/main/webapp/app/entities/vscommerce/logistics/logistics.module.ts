import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { LogisticsComponent } from './logistics.component';
import { LogisticsDetailComponent } from './logistics-detail.component';
import { LogisticsUpdateComponent } from './logistics-update.component';
import { LogisticsDeleteDialogComponent } from './logistics-delete-dialog.component';
import { logisticsRoute } from './logistics.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(logisticsRoute)],
  declarations: [LogisticsComponent, LogisticsDetailComponent, LogisticsUpdateComponent, LogisticsDeleteDialogComponent],
  entryComponents: [LogisticsDeleteDialogComponent],
})
export class VscommerceLogisticsModule {}
