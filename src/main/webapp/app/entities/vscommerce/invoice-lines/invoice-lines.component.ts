import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IInvoiceLines } from 'app/shared/model/vscommerce/invoice-lines.model';
import { InvoiceLinesService } from './invoice-lines.service';
import { InvoiceLinesDeleteDialogComponent } from './invoice-lines-delete-dialog.component';

@Component({
  selector: 'jhi-invoice-lines',
  templateUrl: './invoice-lines.component.html',
})
export class InvoiceLinesComponent implements OnInit, OnDestroy {
  invoiceLines?: IInvoiceLines[];
  eventSubscriber?: Subscription;

  constructor(
    protected invoiceLinesService: InvoiceLinesService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.invoiceLinesService.query().subscribe((res: HttpResponse<IInvoiceLines[]>) => (this.invoiceLines = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInInvoiceLines();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IInvoiceLines): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInInvoiceLines(): void {
    this.eventSubscriber = this.eventManager.subscribe('invoiceLinesListModification', () => this.loadAll());
  }

  delete(invoiceLines: IInvoiceLines): void {
    const modalRef = this.modalService.open(InvoiceLinesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.invoiceLines = invoiceLines;
  }
}
