import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICreditCardType } from 'app/shared/model/vscommerce/credit-card-type.model';
import { CreditCardTypeService } from './credit-card-type.service';
import { CreditCardTypeDeleteDialogComponent } from './credit-card-type-delete-dialog.component';

@Component({
  selector: 'jhi-credit-card-type',
  templateUrl: './credit-card-type.component.html',
})
export class CreditCardTypeComponent implements OnInit, OnDestroy {
  creditCardTypes?: ICreditCardType[];
  eventSubscriber?: Subscription;

  constructor(
    protected creditCardTypeService: CreditCardTypeService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.creditCardTypeService.query().subscribe((res: HttpResponse<ICreditCardType[]>) => (this.creditCardTypes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCreditCardTypes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICreditCardType): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCreditCardTypes(): void {
    this.eventSubscriber = this.eventManager.subscribe('creditCardTypeListModification', () => this.loadAll());
  }

  delete(creditCardType: ICreditCardType): void {
    const modalRef = this.modalService.open(CreditCardTypeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.creditCardType = creditCardType;
  }
}
