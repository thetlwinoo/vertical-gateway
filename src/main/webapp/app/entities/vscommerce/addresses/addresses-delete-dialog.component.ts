import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAddresses } from 'app/shared/model/vscommerce/addresses.model';
import { AddressesService } from './addresses.service';

@Component({
  templateUrl: './addresses-delete-dialog.component.html',
})
export class AddressesDeleteDialogComponent {
  addresses?: IAddresses;

  constructor(protected addressesService: AddressesService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.addressesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('addressesListModification');
      this.activeModal.close();
    });
  }
}
