import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IInvoices } from 'app/shared/model/vscommerce/invoices.model';
import { InvoicesService } from './invoices.service';
import { InvoicesDeleteDialogComponent } from './invoices-delete-dialog.component';

@Component({
  selector: 'jhi-invoices',
  templateUrl: './invoices.component.html',
})
export class InvoicesComponent implements OnInit, OnDestroy {
  invoices?: IInvoices[];
  eventSubscriber?: Subscription;

  constructor(protected invoicesService: InvoicesService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.invoicesService.query().subscribe((res: HttpResponse<IInvoices[]>) => (this.invoices = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInInvoices();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IInvoices): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInInvoices(): void {
    this.eventSubscriber = this.eventManager.subscribe('invoicesListModification', () => this.loadAll());
  }

  delete(invoices: IInvoices): void {
    const modalRef = this.modalService.open(InvoicesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.invoices = invoices;
  }
}
