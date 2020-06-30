import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITaxClass } from 'app/shared/model/vscommerce/tax-class.model';
import { TaxClassService } from './tax-class.service';
import { TaxClassDeleteDialogComponent } from './tax-class-delete-dialog.component';

@Component({
  selector: 'jhi-tax-class',
  templateUrl: './tax-class.component.html',
})
export class TaxClassComponent implements OnInit, OnDestroy {
  taxClasses?: ITaxClass[];
  eventSubscriber?: Subscription;

  constructor(protected taxClassService: TaxClassService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.taxClassService.query().subscribe((res: HttpResponse<ITaxClass[]>) => (this.taxClasses = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTaxClasses();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITaxClass): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTaxClasses(): void {
    this.eventSubscriber = this.eventManager.subscribe('taxClassListModification', () => this.loadAll());
  }

  delete(taxClass: ITaxClass): void {
    const modalRef = this.modalService.open(TaxClassDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.taxClass = taxClass;
  }
}
