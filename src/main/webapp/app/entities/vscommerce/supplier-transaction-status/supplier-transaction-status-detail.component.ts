import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISupplierTransactionStatus } from 'app/shared/model/vscommerce/supplier-transaction-status.model';

@Component({
  selector: 'jhi-supplier-transaction-status-detail',
  templateUrl: './supplier-transaction-status-detail.component.html',
})
export class SupplierTransactionStatusDetailComponent implements OnInit {
  supplierTransactionStatus: ISupplierTransactionStatus | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ supplierTransactionStatus }) => (this.supplierTransactionStatus = supplierTransactionStatus));
  }

  previousState(): void {
    window.history.back();
  }
}
