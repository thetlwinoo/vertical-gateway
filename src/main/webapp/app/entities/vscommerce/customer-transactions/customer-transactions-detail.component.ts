import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICustomerTransactions } from 'app/shared/model/vscommerce/customer-transactions.model';

@Component({
  selector: 'jhi-customer-transactions-detail',
  templateUrl: './customer-transactions-detail.component.html',
})
export class CustomerTransactionsDetailComponent implements OnInit {
  customerTransactions: ICustomerTransactions | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customerTransactions }) => (this.customerTransactions = customerTransactions));
  }

  previousState(): void {
    window.history.back();
  }
}
