import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { TaxClassComponent } from './tax-class.component';
import { TaxClassDetailComponent } from './tax-class-detail.component';
import { TaxClassUpdateComponent } from './tax-class-update.component';
import { TaxClassDeleteDialogComponent } from './tax-class-delete-dialog.component';
import { taxClassRoute } from './tax-class.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(taxClassRoute)],
  declarations: [TaxClassComponent, TaxClassDetailComponent, TaxClassUpdateComponent, TaxClassDeleteDialogComponent],
  entryComponents: [TaxClassDeleteDialogComponent],
})
export class VscommerceTaxClassModule {}
