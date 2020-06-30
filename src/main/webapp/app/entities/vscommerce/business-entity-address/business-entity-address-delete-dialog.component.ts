import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBusinessEntityAddress } from 'app/shared/model/vscommerce/business-entity-address.model';
import { BusinessEntityAddressService } from './business-entity-address.service';

@Component({
  templateUrl: './business-entity-address-delete-dialog.component.html',
})
export class BusinessEntityAddressDeleteDialogComponent {
  businessEntityAddress?: IBusinessEntityAddress;

  constructor(
    protected businessEntityAddressService: BusinessEntityAddressService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.businessEntityAddressService.delete(id).subscribe(() => {
      this.eventManager.broadcast('businessEntityAddressListModification');
      this.activeModal.close();
    });
  }
}
