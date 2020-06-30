import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISupplierTransactions } from 'app/shared/model/vscommerce/supplier-transactions.model';

@Component({
  selector: 'jhi-supplier-transactions-detail',
  templateUrl: './supplier-transactions-detail.component.html',
})
export class SupplierTransactionsDetailComponent implements OnInit {
  supplierTransactions: ISupplierTransactions | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ supplierTransactions }) => (this.supplierTransactions = supplierTransactions));
  }

  previousState(): void {
    window.history.back();
  }
}
