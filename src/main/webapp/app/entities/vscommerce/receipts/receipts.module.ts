import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { ReceiptsComponent } from './receipts.component';
import { ReceiptsDetailComponent } from './receipts-detail.component';
import { ReceiptsUpdateComponent } from './receipts-update.component';
import { ReceiptsDeleteDialogComponent } from './receipts-delete-dialog.component';
import { receiptsRoute } from './receipts.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(receiptsRoute)],
  declarations: [ReceiptsComponent, ReceiptsDetailComponent, ReceiptsUpdateComponent, ReceiptsDeleteDialogComponent],
  entryComponents: [ReceiptsDeleteDialogComponent],
})
export class VscommerceReceiptsModule {}
