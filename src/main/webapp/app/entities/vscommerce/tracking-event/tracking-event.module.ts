import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { TrackingEventComponent } from './tracking-event.component';
import { TrackingEventDetailComponent } from './tracking-event-detail.component';
import { TrackingEventUpdateComponent } from './tracking-event-update.component';
import { TrackingEventDeleteDialogComponent } from './tracking-event-delete-dialog.component';
import { trackingEventRoute } from './tracking-event.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(trackingEventRoute)],
  declarations: [TrackingEventComponent, TrackingEventDetailComponent, TrackingEventUpdateComponent, TrackingEventDeleteDialogComponent],
  entryComponents: [TrackingEventDeleteDialogComponent],
})
export class VscommerceTrackingEventModule {}
