import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInvoiceLines } from 'app/shared/model/vscommerce/invoice-lines.model';

@Component({
  selector: 'jhi-invoice-lines-detail',
  templateUrl: './invoice-lines-detail.component.html',
})
export class InvoiceLinesDetailComponent implements OnInit {
  invoiceLines: IInvoiceLines | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ invoiceLines }) => (this.invoiceLines = invoiceLines));
  }

  previousState(): void {
    window.history.back();
  }
}
