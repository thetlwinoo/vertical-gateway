import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICardTypes } from 'app/shared/model/vscommerce/card-types.model';

@Component({
  selector: 'jhi-card-types-detail',
  templateUrl: './card-types-detail.component.html',
})
export class CardTypesDetailComponent implements OnInit {
  cardTypes: ICardTypes | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cardTypes }) => (this.cardTypes = cardTypes));
  }

  previousState(): void {
    window.history.back();
  }
}
