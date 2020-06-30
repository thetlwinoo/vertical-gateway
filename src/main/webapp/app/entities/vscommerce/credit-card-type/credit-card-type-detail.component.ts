import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICreditCardType } from 'app/shared/model/vscommerce/credit-card-type.model';

@Component({
  selector: 'jhi-credit-card-type-detail',
  templateUrl: './credit-card-type-detail.component.html',
})
export class CreditCardTypeDetailComponent implements OnInit {
  creditCardType: ICreditCardType | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ creditCardType }) => (this.creditCardType = creditCardType));
  }

  previousState(): void {
    window.history.back();
  }
}
