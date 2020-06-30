import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICurrencyRate } from 'app/shared/model/vscommerce/currency-rate.model';
import { CurrencyRateService } from './currency-rate.service';
import { CurrencyRateDeleteDialogComponent } from './currency-rate-delete-dialog.component';

@Component({
  selector: 'jhi-currency-rate',
  templateUrl: './currency-rate.component.html',
})
export class CurrencyRateComponent implements OnInit, OnDestroy {
  currencyRates?: ICurrencyRate[];
  eventSubscriber?: Subscription;

  constructor(
    protected currencyRateService: CurrencyRateService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.currencyRateService.query().subscribe((res: HttpResponse<ICurrencyRate[]>) => (this.currencyRates = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCurrencyRates();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICurrencyRate): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCurrencyRates(): void {
    this.eventSubscriber = this.eventManager.subscribe('currencyRateListModification', () => this.loadAll());
  }

  delete(currencyRate: ICurrencyRate): void {
    const modalRef = this.modalService.open(CurrencyRateDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.currencyRate = currencyRate;
  }
}
