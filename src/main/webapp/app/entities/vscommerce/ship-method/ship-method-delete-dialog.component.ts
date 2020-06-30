import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IShipMethod } from 'app/shared/model/vscommerce/ship-method.model';
import { ShipMethodService } from './ship-method.service';

@Component({
  templateUrl: './ship-method-delete-dialog.component.html',
})
export class ShipMethodDeleteDialogComponent {
  shipMethod?: IShipMethod;

  constructor(
    protected shipMethodService: ShipMethodService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.shipMethodService.delete(id).subscribe(() => {
      this.eventManager.broadcast('shipMethodListModification');
      this.activeModal.close();
    });
  }
}
