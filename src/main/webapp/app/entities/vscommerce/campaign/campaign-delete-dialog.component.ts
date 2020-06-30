import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICampaign } from 'app/shared/model/vscommerce/campaign.model';
import { CampaignService } from './campaign.service';

@Component({
  templateUrl: './campaign-delete-dialog.component.html',
})
export class CampaignDeleteDialogComponent {
  campaign?: ICampaign;

  constructor(protected campaignService: CampaignService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.campaignService.delete(id).subscribe(() => {
      this.eventManager.broadcast('campaignListModification');
      this.activeModal.close();
    });
  }
}
