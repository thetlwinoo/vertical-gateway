import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICampaign } from 'app/shared/model/vscommerce/campaign.model';
import { CampaignService } from './campaign.service';
import { CampaignDeleteDialogComponent } from './campaign-delete-dialog.component';

@Component({
  selector: 'jhi-campaign',
  templateUrl: './campaign.component.html',
})
export class CampaignComponent implements OnInit, OnDestroy {
  campaigns?: ICampaign[];
  eventSubscriber?: Subscription;

  constructor(protected campaignService: CampaignService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.campaignService.query().subscribe((res: HttpResponse<ICampaign[]>) => (this.campaigns = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCampaigns();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICampaign): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCampaigns(): void {
    this.eventSubscriber = this.eventManager.subscribe('campaignListModification', () => this.loadAll());
  }

  delete(campaign: ICampaign): void {
    const modalRef = this.modalService.open(CampaignDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.campaign = campaign;
  }
}
