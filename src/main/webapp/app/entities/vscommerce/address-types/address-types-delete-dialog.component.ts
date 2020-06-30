import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAddressTypes } from 'app/shared/model/vscommerce/address-types.model';
import { AddressTypesService } from './address-types.service';

@Component({
  templateUrl: './address-types-delete-dialog.component.html',
})
export class AddressTypesDeleteDialogComponent {
  addressTypes?: IAddressTypes;

  constructor(
    protected addressTypesService: AddressTypesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.addressTypesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('addressTypesListModification');
      this.activeModal.close();
    });
  }
}
