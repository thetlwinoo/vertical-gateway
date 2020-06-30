import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISupplierCategories } from 'app/shared/model/vscommerce/supplier-categories.model';
import { SupplierCategoriesService } from './supplier-categories.service';
import { SupplierCategoriesDeleteDialogComponent } from './supplier-categories-delete-dialog.component';

@Component({
  selector: 'jhi-supplier-categories',
  templateUrl: './supplier-categories.component.html',
})
export class SupplierCategoriesComponent implements OnInit, OnDestroy {
  supplierCategories?: ISupplierCategories[];
  eventSubscriber?: Subscription;

  constructor(
    protected supplierCategoriesService: SupplierCategoriesService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.supplierCategoriesService
      .query()
      .subscribe((res: HttpResponse<ISupplierCategories[]>) => (this.supplierCategories = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSupplierCategories();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISupplierCategories): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSupplierCategories(): void {
    this.eventSubscriber = this.eventManager.subscribe('supplierCategoriesListModification', () => this.loadAll());
  }

  delete(supplierCategories: ISupplierCategories): void {
    const modalRef = this.modalService.open(SupplierCategoriesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.supplierCategories = supplierCategories;
  }
}
