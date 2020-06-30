import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUploadTransactions } from 'app/shared/model/vscommerce/upload-transactions.model';
import { UploadTransactionsService } from './upload-transactions.service';
import { UploadTransactionsDeleteDialogComponent } from './upload-transactions-delete-dialog.component';

@Component({
  selector: 'jhi-upload-transactions',
  templateUrl: './upload-transactions.component.html',
})
export class UploadTransactionsComponent implements OnInit, OnDestroy {
  uploadTransactions?: IUploadTransactions[];
  eventSubscriber?: Subscription;

  constructor(
    protected uploadTransactionsService: UploadTransactionsService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.uploadTransactionsService
      .query()
      .subscribe((res: HttpResponse<IUploadTransactions[]>) => (this.uploadTransactions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInUploadTransactions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IUploadTransactions): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInUploadTransactions(): void {
    this.eventSubscriber = this.eventManager.subscribe('uploadTransactionsListModification', () => this.loadAll());
  }

  delete(uploadTransactions: IUploadTransactions): void {
    const modalRef = this.modalService.open(UploadTransactionsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.uploadTransactions = uploadTransactions;
  }
}
