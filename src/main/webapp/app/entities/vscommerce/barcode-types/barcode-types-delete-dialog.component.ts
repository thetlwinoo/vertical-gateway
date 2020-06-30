import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBarcodeTypes } from 'app/shared/model/vscommerce/barcode-types.model';
import { BarcodeTypesService } from './barcode-types.service';

@Component({
  templateUrl: './barcode-types-delete-dialog.component.html',
})
export class BarcodeTypesDeleteDialogComponent {
  barcodeTypes?: IBarcodeTypes;

  constructor(
    protected barcodeTypesService: BarcodeTypesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.barcodeTypesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('barcodeTypesListModification');
      this.activeModal.close();
    });
  }
}
