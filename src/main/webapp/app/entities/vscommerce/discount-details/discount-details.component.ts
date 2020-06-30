import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDiscountDetails } from 'app/shared/model/vscommerce/discount-details.model';
import { DiscountDetailsService } from './discount-details.service';
import { DiscountDetailsDeleteDialogComponent } from './discount-details-delete-dialog.component';

@Component({
  selector: 'jhi-discount-details',
  templateUrl: './discount-details.component.html',
})
export class DiscountDetailsComponent implements OnInit, OnDestroy {
  discountDetails?: IDiscountDetails[];
  eventSubscriber?: Subscription;

  constructor(
    protected discountDetailsService: DiscountDetailsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.discountDetailsService.query().subscribe((res: HttpResponse<IDiscountDetails[]>) => (this.discountDetails = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDiscountDetails();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDiscountDetails): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDiscountDetails(): void {
    this.eventSubscriber = this.eventManager.subscribe('discountDetailsListModification', () => this.loadAll());
  }

  delete(discountDetails: IDiscountDetails): void {
    const modalRef = this.modalService.open(DiscountDetailsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.discountDetails = discountDetails;
  }
}
