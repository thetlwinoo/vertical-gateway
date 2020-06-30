import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { UploadActionTypesComponent } from './upload-action-types.component';
import { UploadActionTypesDetailComponent } from './upload-action-types-detail.component';
import { UploadActionTypesUpdateComponent } from './upload-action-types-update.component';
import { UploadActionTypesDeleteDialogComponent } from './upload-action-types-delete-dialog.component';
import { uploadActionTypesRoute } from './upload-action-types.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(uploadActionTypesRoute)],
  declarations: [
    UploadActionTypesComponent,
    UploadActionTypesDetailComponent,
    UploadActionTypesUpdateComponent,
    UploadActionTypesDeleteDialogComponent,
  ],
  entryComponents: [UploadActionTypesDeleteDialogComponent],
})
export class VscommerceUploadActionTypesModule {}
