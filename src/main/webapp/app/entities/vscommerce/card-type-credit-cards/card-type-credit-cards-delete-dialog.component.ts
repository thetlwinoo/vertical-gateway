import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICardTypeCreditCards } from 'app/shared/model/vscommerce/card-type-credit-cards.model';
import { CardTypeCreditCardsService } from './card-type-credit-cards.service';

@Component({
  templateUrl: './card-type-credit-cards-delete-dialog.component.html',
})
export class CardTypeCreditCardsDeleteDialogComponent {
  cardTypeCreditCards?: ICardTypeCreditCards;

  constructor(
    protected cardTypeCreditCardsService: CardTypeCreditCardsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cardTypeCreditCardsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('cardTypeCreditCardsListModification');
      this.activeModal.close();
    });
  }
}
