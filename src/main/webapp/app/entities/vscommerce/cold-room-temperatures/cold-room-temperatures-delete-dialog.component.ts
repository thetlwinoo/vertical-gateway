import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IColdRoomTemperatures } from 'app/shared/model/vscommerce/cold-room-temperatures.model';
import { ColdRoomTemperaturesService } from './cold-room-temperatures.service';

@Component({
  templateUrl: './cold-room-temperatures-delete-dialog.component.html',
})
export class ColdRoomTemperaturesDeleteDialogComponent {
  coldRoomTemperatures?: IColdRoomTemperatures;

  constructor(
    protected coldRoomTemperaturesService: ColdRoomTemperaturesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.coldRoomTemperaturesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('coldRoomTemperaturesListModification');
      this.activeModal.close();
    });
  }
}
