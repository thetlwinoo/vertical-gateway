import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDiscountTypes } from 'app/shared/model/vscommerce/discount-types.model';
import { DiscountTypesService } from './discount-types.service';
import { DiscountTypesDeleteDialogComponent } from './discount-types-delete-dialog.component';

@Component({
  selector: 'jhi-discount-types',
  templateUrl: './discount-types.component.html',
})
export class DiscountTypesComponent implements OnInit, OnDestroy {
  discountTypes?: IDiscountTypes[];
  eventSubscriber?: Subscription;

  constructor(
    protected discountTypesService: DiscountTypesService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.discountTypesService.query().subscribe((res: HttpResponse<IDiscountTypes[]>) => (this.discountTypes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDiscountTypes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDiscountTypes): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDiscountTypes(): void {
    this.eventSubscriber = this.eventManager.subscribe('discountTypesListModification', () => this.loadAll());
  }

  delete(discountTypes: IDiscountTypes): void {
    const modalRef = this.modalService.open(DiscountTypesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.discountTypes = discountTypes;
  }
}
