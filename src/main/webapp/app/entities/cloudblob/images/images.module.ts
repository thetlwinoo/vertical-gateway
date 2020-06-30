import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { ImagesComponent } from './images.component';
import { ImagesDetailComponent } from './images-detail.component';
import { ImagesUpdateComponent } from './images-update.component';
import { ImagesDeleteDialogComponent } from './images-delete-dialog.component';
import { imagesRoute } from './images.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(imagesRoute)],
  declarations: [ImagesComponent, ImagesDetailComponent, ImagesUpdateComponent, ImagesDeleteDialogComponent],
  entryComponents: [ImagesDeleteDialogComponent],
})
export class CloudblobImagesModule {}
