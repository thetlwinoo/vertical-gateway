import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITransactionTypes } from 'app/shared/model/vscommerce/transaction-types.model';
import { TransactionTypesService } from './transaction-types.service';
import { TransactionTypesDeleteDialogComponent } from './transaction-types-delete-dialog.component';

@Component({
  selector: 'jhi-transaction-types',
  templateUrl: './transaction-types.component.html',
})
export class TransactionTypesComponent implements OnInit, OnDestroy {
  transactionTypes?: ITransactionTypes[];
  eventSubscriber?: Subscription;

  constructor(
    protected transactionTypesService: TransactionTypesService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.transactionTypesService.query().subscribe((res: HttpResponse<ITransactionTypes[]>) => (this.transactionTypes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTransactionTypes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITransactionTypes): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTransactionTypes(): void {
    this.eventSubscriber = this.eventManager.subscribe('transactionTypesListModification', () => this.loadAll());
  }

  delete(transactionTypes: ITransactionTypes): void {
    const modalRef = this.modalService.open(TransactionTypesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.transactionTypes = transactionTypes;
  }
}
