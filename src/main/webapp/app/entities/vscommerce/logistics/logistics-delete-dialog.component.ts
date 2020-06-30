import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILogistics } from 'app/shared/model/vscommerce/logistics.model';
import { LogisticsService } from './logistics.service';

@Component({
  templateUrl: './logistics-delete-dialog.component.html',
})
export class LogisticsDeleteDialogComponent {
  logistics?: ILogistics;

  constructor(protected logisticsService: LogisticsService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.logisticsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('logisticsListModification');
      this.activeModal.close();
    });
  }
}
