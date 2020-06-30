import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReceipts } from 'app/shared/model/vscommerce/receipts.model';

@Component({
  selector: 'jhi-receipts-detail',
  templateUrl: './receipts-detail.component.html',
})
export class ReceiptsDetailComponent implements OnInit {
  receipts: IReceipts | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ receipts }) => (this.receipts = receipts));
  }

  previousState(): void {
    window.history.back();
  }
}
