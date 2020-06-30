import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IUploadTransactions } from 'app/shared/model/vscommerce/upload-transactions.model';

@Component({
  selector: 'jhi-upload-transactions-detail',
  templateUrl: './upload-transactions-detail.component.html',
})
export class UploadTransactionsDetailComponent implements OnInit {
  uploadTransactions: IUploadTransactions | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ uploadTransactions }) => (this.uploadTransactions = uploadTransactions));
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
