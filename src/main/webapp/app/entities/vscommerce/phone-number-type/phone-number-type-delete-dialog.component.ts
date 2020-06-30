import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPhoneNumberType } from 'app/shared/model/vscommerce/phone-number-type.model';
import { PhoneNumberTypeService } from './phone-number-type.service';

@Component({
  templateUrl: './phone-number-type-delete-dialog.component.html',
})
export class PhoneNumberTypeDeleteDialogComponent {
  phoneNumberType?: IPhoneNumberType;

  constructor(
    protected phoneNumberTypeService: PhoneNumberTypeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.phoneNumberTypeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('phoneNumberTypeListModification');
      this.activeModal.close();
    });
  }
}
