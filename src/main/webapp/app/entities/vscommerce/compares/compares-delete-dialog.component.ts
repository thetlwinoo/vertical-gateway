import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICompares } from 'app/shared/model/vscommerce/compares.model';
import { ComparesService } from './compares.service';

@Component({
  templateUrl: './compares-delete-dialog.component.html',
})
export class ComparesDeleteDialogComponent {
  compares?: ICompares;

  constructor(protected comparesService: ComparesService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.comparesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('comparesListModification');
      this.activeModal.close();
    });
  }
}
