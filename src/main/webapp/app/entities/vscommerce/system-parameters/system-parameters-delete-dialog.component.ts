import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISystemParameters } from 'app/shared/model/vscommerce/system-parameters.model';
import { SystemParametersService } from './system-parameters.service';

@Component({
  templateUrl: './system-parameters-delete-dialog.component.html',
})
export class SystemParametersDeleteDialogComponent {
  systemParameters?: ISystemParameters;

  constructor(
    protected systemParametersService: SystemParametersService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.systemParametersService.delete(id).subscribe(() => {
      this.eventManager.broadcast('systemParametersListModification');
      this.activeModal.close();
    });
  }
}
