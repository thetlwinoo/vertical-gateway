import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBankAccounts } from 'app/shared/model/vscommerce/bank-accounts.model';
import { BankAccountsService } from './bank-accounts.service';

@Component({
  templateUrl: './bank-accounts-delete-dialog.component.html',
})
export class BankAccountsDeleteDialogComponent {
  bankAccounts?: IBankAccounts;

  constructor(
    protected bankAccountsService: BankAccountsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.bankAccountsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('bankAccountsListModification');
      this.activeModal.close();
    });
  }
}
