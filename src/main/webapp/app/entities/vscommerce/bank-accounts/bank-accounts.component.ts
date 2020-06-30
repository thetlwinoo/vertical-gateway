import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBankAccounts } from 'app/shared/model/vscommerce/bank-accounts.model';
import { BankAccountsService } from './bank-accounts.service';
import { BankAccountsDeleteDialogComponent } from './bank-accounts-delete-dialog.component';

@Component({
  selector: 'jhi-bank-accounts',
  templateUrl: './bank-accounts.component.html',
})
export class BankAccountsComponent implements OnInit, OnDestroy {
  bankAccounts?: IBankAccounts[];
  eventSubscriber?: Subscription;

  constructor(
    protected bankAccountsService: BankAccountsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.bankAccountsService.query().subscribe((res: HttpResponse<IBankAccounts[]>) => (this.bankAccounts = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInBankAccounts();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IBankAccounts): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInBankAccounts(): void {
    this.eventSubscriber = this.eventManager.subscribe('bankAccountsListModification', () => this.loadAll());
  }

  delete(bankAccounts: IBankAccounts): void {
    const modalRef = this.modalService.open(BankAccountsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.bankAccounts = bankAccounts;
  }
}
