import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { PhotosComponent } from './photos.component';
import { PhotosDetailComponent } from './photos-detail.component';
import { PhotosUpdateComponent } from './photos-update.component';
import { PhotosDeleteDialogComponent } from './photos-delete-dialog.component';
import { photosRoute } from './photos.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(photosRoute)],
  declarations: [PhotosComponent, PhotosDetailComponent, PhotosUpdateComponent, PhotosDeleteDialogComponent],
  entryComponents: [PhotosDeleteDialogComponent],
})
export class VscommercePhotosModule {}
