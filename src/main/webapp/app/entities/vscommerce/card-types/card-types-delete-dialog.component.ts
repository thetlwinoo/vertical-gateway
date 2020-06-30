import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICardTypes } from 'app/shared/model/vscommerce/card-types.model';
import { CardTypesService } from './card-types.service';

@Component({
  templateUrl: './card-types-delete-dialog.component.html',
})
export class CardTypesDeleteDialogComponent {
  cardTypes?: ICardTypes;

  constructor(protected cardTypesService: CardTypesService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cardTypesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('cardTypesListModification');
      this.activeModal.close();
    });
  }
}
