import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWarrantyTypes } from 'app/shared/model/vscommerce/warranty-types.model';
import { WarrantyTypesService } from './warranty-types.service';

@Component({
  templateUrl: './warranty-types-delete-dialog.component.html',
})
export class WarrantyTypesDeleteDialogComponent {
  warrantyTypes?: IWarrantyTypes;

  constructor(
    protected warrantyTypesService: WarrantyTypesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.warrantyTypesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('warrantyTypesListModification');
      this.activeModal.close();
    });
  }
}
