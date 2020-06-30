import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITransactionTypes } from 'app/shared/model/vscommerce/transaction-types.model';

@Component({
  selector: 'jhi-transaction-types-detail',
  templateUrl: './transaction-types-detail.component.html',
})
export class TransactionTypesDetailComponent implements OnInit {
  transactionTypes: ITransactionTypes | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ transactionTypes }) => (this.transactionTypes = transactionTypes));
  }

  previousState(): void {
    window.history.back();
  }
}
