import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { CampaignComponent } from './campaign.component';
import { CampaignDetailComponent } from './campaign-detail.component';
import { CampaignUpdateComponent } from './campaign-update.component';
import { CampaignDeleteDialogComponent } from './campaign-delete-dialog.component';
import { campaignRoute } from './campaign.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(campaignRoute)],
  declarations: [CampaignComponent, CampaignDetailComponent, CampaignUpdateComponent, CampaignDeleteDialogComponent],
  entryComponents: [CampaignDeleteDialogComponent],
})
export class VscommerceCampaignModule {}
