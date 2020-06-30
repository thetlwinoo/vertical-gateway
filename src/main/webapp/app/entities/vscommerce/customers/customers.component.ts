import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICustomers } from 'app/shared/model/vscommerce/customers.model';
import { CustomersService } from './customers.service';
import { CustomersDeleteDialogComponent } from './customers-delete-dialog.component';

@Component({
  selector: 'jhi-customers',
  templateUrl: './customers.component.html',
})
export class CustomersComponent implements OnInit, OnDestroy {
  customers?: ICustomers[];
  eventSubscriber?: Subscription;

  constructor(protected customersService: CustomersService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.customersService.query().subscribe((res: HttpResponse<ICustomers[]>) => (this.customers = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCustomers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICustomers): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCustomers(): void {
    this.eventSubscriber = this.eventManager.subscribe('customersListModification', () => this.loadAll());
  }

  delete(customers: ICustomers): void {
    const modalRef = this.modalService.open(CustomersDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.customers = customers;
  }
}
