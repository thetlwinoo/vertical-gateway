import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICardTypeCreditCards } from 'app/shared/model/vscommerce/card-type-credit-cards.model';

@Component({
  selector: 'jhi-card-type-credit-cards-detail',
  templateUrl: './card-type-credit-cards-detail.component.html',
})
export class CardTypeCreditCardsDetailComponent implements OnInit {
  cardTypeCreditCards: ICardTypeCreditCards | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cardTypeCreditCards }) => (this.cardTypeCreditCards = cardTypeCreditCards));
  }

  previousState(): void {
    window.history.back();
  }
}
