import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMaterials } from 'app/shared/model/vscommerce/materials.model';
import { MaterialsService } from './materials.service';

@Component({
  templateUrl: './materials-delete-dialog.component.html',
})
export class MaterialsDeleteDialogComponent {
  materials?: IMaterials;

  constructor(protected materialsService: MaterialsService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.materialsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('materialsListModification');
      this.activeModal.close();
    });
  }
}
