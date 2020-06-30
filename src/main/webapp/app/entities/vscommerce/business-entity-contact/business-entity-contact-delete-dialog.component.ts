import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBusinessEntityContact } from 'app/shared/model/vscommerce/business-entity-contact.model';
import { BusinessEntityContactService } from './business-entity-contact.service';

@Component({
  templateUrl: './business-entity-contact-delete-dialog.component.html',
})
export class BusinessEntityContactDeleteDialogComponent {
  businessEntityContact?: IBusinessEntityContact;

  constructor(
    protected businessEntityContactService: BusinessEntityContactService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.businessEntityContactService.delete(id).subscribe(() => {
      this.eventManager.broadcast('businessEntityContactListModification');
      this.activeModal.close();
    });
  }
}
