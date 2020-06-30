import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBuyingGroups } from 'app/shared/model/vscommerce/buying-groups.model';
import { BuyingGroupsService } from './buying-groups.service';

@Component({
  templateUrl: './buying-groups-delete-dialog.component.html',
})
export class BuyingGroupsDeleteDialogComponent {
  buyingGroups?: IBuyingGroups;

  constructor(
    protected buyingGroupsService: BuyingGroupsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.buyingGroupsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('buyingGroupsListModification');
      this.activeModal.close();
    });
  }
}
