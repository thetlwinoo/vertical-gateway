import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISpecialDeals } from 'app/shared/model/vscommerce/special-deals.model';
import { SpecialDealsService } from './special-deals.service';
import { SpecialDealsDeleteDialogComponent } from './special-deals-delete-dialog.component';

@Component({
  selector: 'jhi-special-deals',
  templateUrl: './special-deals.component.html',
})
export class SpecialDealsComponent implements OnInit, OnDestroy {
  specialDeals?: ISpecialDeals[];
  eventSubscriber?: Subscription;

  constructor(
    protected specialDealsService: SpecialDealsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.specialDealsService.query().subscribe((res: HttpResponse<ISpecialDeals[]>) => (this.specialDeals = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSpecialDeals();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISpecialDeals): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSpecialDeals(): void {
    this.eventSubscriber = this.eventManager.subscribe('specialDealsListModification', () => this.loadAll());
  }

  delete(specialDeals: ISpecialDeals): void {
    const modalRef = this.modalService.open(SpecialDealsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.specialDeals = specialDeals;
  }
}
