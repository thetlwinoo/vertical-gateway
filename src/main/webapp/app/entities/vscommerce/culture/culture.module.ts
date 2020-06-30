import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { CultureComponent } from './culture.component';
import { CultureDetailComponent } from './culture-detail.component';
import { CultureUpdateComponent } from './culture-update.component';
import { CultureDeleteDialogComponent } from './culture-delete-dialog.component';
import { cultureRoute } from './culture.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(cultureRoute)],
  declarations: [CultureComponent, CultureDetailComponent, CultureUpdateComponent, CultureDeleteDialogComponent],
  entryComponents: [CultureDeleteDialogComponent],
})
export class VscommerceCultureModule {}
