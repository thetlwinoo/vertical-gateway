import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISupplierTransactionStatus } from 'app/shared/model/vscommerce/supplier-transaction-status.model';
import { SupplierTransactionStatusService } from './supplier-transaction-status.service';
import { SupplierTransactionStatusDeleteDialogComponent } from './supplier-transaction-status-delete-dialog.component';

@Component({
  selector: 'jhi-supplier-transaction-status',
  templateUrl: './supplier-transaction-status.component.html',
})
export class SupplierTransactionStatusComponent implements OnInit, OnDestroy {
  supplierTransactionStatuses?: ISupplierTransactionStatus[];
  eventSubscriber?: Subscription;

  constructor(
    protected supplierTransactionStatusService: SupplierTransactionStatusService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.supplierTransactionStatusService
      .query()
      .subscribe((res: HttpResponse<ISupplierTransactionStatus[]>) => (this.supplierTransactionStatuses = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSupplierTransactionStatuses();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISupplierTransactionStatus): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSupplierTransactionStatuses(): void {
    this.eventSubscriber = this.eventManager.subscribe('supplierTransactionStatusListModification', () => this.loadAll());
  }

  delete(supplierTransactionStatus: ISupplierTransactionStatus): void {
    const modalRef = this.modalService.open(SupplierTransactionStatusDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.supplierTransactionStatus = supplierTransactionStatus;
  }
}
