import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPersonEmailAddress } from 'app/shared/model/vscommerce/person-email-address.model';
import { PersonEmailAddressService } from './person-email-address.service';

@Component({
  templateUrl: './person-email-address-delete-dialog.component.html',
})
export class PersonEmailAddressDeleteDialogComponent {
  personEmailAddress?: IPersonEmailAddress;

  constructor(
    protected personEmailAddressService: PersonEmailAddressService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.personEmailAddressService.delete(id).subscribe(() => {
      this.eventManager.broadcast('personEmailAddressListModification');
      this.activeModal.close();
    });
  }
}
