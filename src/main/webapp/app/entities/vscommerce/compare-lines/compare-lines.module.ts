import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { CompareLinesComponent } from './compare-lines.component';
import { CompareLinesDetailComponent } from './compare-lines-detail.component';
import { CompareLinesUpdateComponent } from './compare-lines-update.component';
import { CompareLinesDeleteDialogComponent } from './compare-lines-delete-dialog.component';
import { compareLinesRoute } from './compare-lines.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(compareLinesRoute)],
  declarations: [CompareLinesComponent, CompareLinesDetailComponent, CompareLinesUpdateComponent, CompareLinesDeleteDialogComponent],
  entryComponents: [CompareLinesDeleteDialogComponent],
})
export class VscommerceCompareLinesModule {}
