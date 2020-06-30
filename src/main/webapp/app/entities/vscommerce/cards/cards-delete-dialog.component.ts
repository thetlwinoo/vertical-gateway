import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICards } from 'app/shared/model/vscommerce/cards.model';
import { CardsService } from './cards.service';

@Component({
  templateUrl: './cards-delete-dialog.component.html',
})
export class CardsDeleteDialogComponent {
  cards?: ICards;

  constructor(protected cardsService: CardsService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cardsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('cardsListModification');
      this.activeModal.close();
    });
  }
}
