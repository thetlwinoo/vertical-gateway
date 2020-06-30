import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISuppliers } from 'app/shared/model/vscommerce/suppliers.model';
import { SuppliersService } from './suppliers.service';
import { SuppliersDeleteDialogComponent } from './suppliers-delete-dialog.component';

@Component({
  selector: 'jhi-suppliers',
  templateUrl: './suppliers.component.html',
})
export class SuppliersComponent implements OnInit, OnDestroy {
  suppliers?: ISuppliers[];
  eventSubscriber?: Subscription;

  constructor(protected suppliersService: SuppliersService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.suppliersService.query().subscribe((res: HttpResponse<ISuppliers[]>) => (this.suppliers = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSuppliers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISuppliers): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSuppliers(): void {
    this.eventSubscriber = this.eventManager.subscribe('suppliersListModification', () => this.loadAll());
  }

  delete(suppliers: ISuppliers): void {
    const modalRef = this.modalService.open(SuppliersDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.suppliers = suppliers;
  }
}
