import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICustomerTransactions } from 'app/shared/model/vscommerce/customer-transactions.model';
import { CustomerTransactionsService } from './customer-transactions.service';

@Component({
  templateUrl: './customer-transactions-delete-dialog.component.html',
})
export class CustomerTransactionsDeleteDialogComponent {
  customerTransactions?: ICustomerTransactions;

  constructor(
    protected customerTransactionsService: CustomerTransactionsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.customerTransactionsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('customerTransactionsListModification');
      this.activeModal.close();
    });
  }
}
