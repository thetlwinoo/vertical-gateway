import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProductDocument } from 'app/shared/model/vscommerce/product-document.model';
import { ProductDocumentService } from './product-document.service';
import { ProductDocumentDeleteDialogComponent } from './product-document-delete-dialog.component';

@Component({
  selector: 'jhi-product-document',
  templateUrl: './product-document.component.html',
})
export class ProductDocumentComponent implements OnInit, OnDestroy {
  productDocuments?: IProductDocument[];
  eventSubscriber?: Subscription;

  constructor(
    protected productDocumentService: ProductDocumentService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.productDocumentService.query().subscribe((res: HttpResponse<IProductDocument[]>) => (this.productDocuments = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProductDocuments();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProductDocument): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInProductDocuments(): void {
    this.eventSubscriber = this.eventManager.subscribe('productDocumentListModification', () => this.loadAll());
  }

  delete(productDocument: IProductDocument): void {
    const modalRef = this.modalService.open(ProductDocumentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.productDocument = productDocument;
  }
}
