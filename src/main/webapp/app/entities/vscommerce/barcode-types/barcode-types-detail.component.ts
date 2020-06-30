import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBarcodeTypes } from 'app/shared/model/vscommerce/barcode-types.model';

@Component({
  selector: 'jhi-barcode-types-detail',
  templateUrl: './barcode-types-detail.component.html',
})
export class BarcodeTypesDetailComponent implements OnInit {
  barcodeTypes: IBarcodeTypes | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ barcodeTypes }) => (this.barcodeTypes = barcodeTypes));
  }

  previousState(): void {
    window.history.back();
  }
}
