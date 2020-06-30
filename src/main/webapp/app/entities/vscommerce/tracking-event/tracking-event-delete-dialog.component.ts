import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITrackingEvent } from 'app/shared/model/vscommerce/tracking-event.model';
import { TrackingEventService } from './tracking-event.service';

@Component({
  templateUrl: './tracking-event-delete-dialog.component.html',
})
export class TrackingEventDeleteDialogComponent {
  trackingEvent?: ITrackingEvent;

  constructor(
    protected trackingEventService: TrackingEventService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.trackingEventService.delete(id).subscribe(() => {
      this.eventManager.broadcast('trackingEventListModification');
      this.activeModal.close();
    });
  }
}
