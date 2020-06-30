import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISuppliers } from 'app/shared/model/vscommerce/suppliers.model';
import { SuppliersService } from './suppliers.service';

@Component({
  templateUrl: './suppliers-delete-dialog.component.html',
})
export class SuppliersDeleteDialogComponent {
  suppliers?: ISuppliers;

  constructor(protected suppliersService: SuppliersService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.suppliersService.delete(id).subscribe(() => {
      this.eventManager.broadcast('suppliersListModification');
      this.activeModal.close();
    });
  }
}
