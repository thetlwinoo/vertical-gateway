import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITax } from 'app/shared/model/vscommerce/tax.model';
import { TaxService } from './tax.service';
import { TaxDeleteDialogComponent } from './tax-delete-dialog.component';

@Component({
  selector: 'jhi-tax',
  templateUrl: './tax.component.html',
})
export class TaxComponent implements OnInit, OnDestroy {
  taxes?: ITax[];
  eventSubscriber?: Subscription;

  constructor(protected taxService: TaxService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.taxService.query().subscribe((res: HttpResponse<ITax[]>) => (this.taxes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTaxes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITax): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTaxes(): void {
    this.eventSubscriber = this.eventManager.subscribe('taxListModification', () => this.loadAll());
  }

  delete(tax: ITax): void {
    const modalRef = this.modalService.open(TaxDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tax = tax;
  }
}
