import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBankAccounts } from 'app/shared/model/vscommerce/bank-accounts.model';

@Component({
  selector: 'jhi-bank-accounts-detail',
  templateUrl: './bank-accounts-detail.component.html',
})
export class BankAccountsDetailComponent implements OnInit {
  bankAccounts: IBankAccounts | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bankAccounts }) => (this.bankAccounts = bankAccounts));
  }

  previousState(): void {
    window.history.back();
  }
}
