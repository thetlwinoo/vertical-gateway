import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStateProvinces } from 'app/shared/model/vscommerce/state-provinces.model';
import { StateProvincesService } from './state-provinces.service';

@Component({
  templateUrl: './state-provinces-delete-dialog.component.html',
})
export class StateProvincesDeleteDialogComponent {
  stateProvinces?: IStateProvinces;

  constructor(
    protected stateProvincesService: StateProvincesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.stateProvincesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('stateProvincesListModification');
      this.activeModal.close();
    });
  }
}
