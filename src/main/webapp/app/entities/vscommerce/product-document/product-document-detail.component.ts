import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IProductDocument } from 'app/shared/model/vscommerce/product-document.model';

@Component({
  selector: 'jhi-product-document-detail',
  templateUrl: './product-document-detail.component.html',
})
export class ProductDocumentDetailComponent implements OnInit {
  productDocument: IProductDocument | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productDocument }) => (this.productDocument = productDocument));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
