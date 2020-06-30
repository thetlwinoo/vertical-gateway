import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPersonPhone } from 'app/shared/model/vscommerce/person-phone.model';
import { PersonPhoneService } from './person-phone.service';

@Component({
  templateUrl: './person-phone-delete-dialog.component.html',
})
export class PersonPhoneDeleteDialogComponent {
  personPhone?: IPersonPhone;

  constructor(
    protected personPhoneService: PersonPhoneService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.personPhoneService.delete(id).subscribe(() => {
      this.eventManager.broadcast('personPhoneListModification');
      this.activeModal.close();
    });
  }
}
