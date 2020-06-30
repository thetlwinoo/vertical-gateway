import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAddressTypes } from 'app/shared/model/vscommerce/address-types.model';
import { AddressTypesService } from './address-types.service';
import { AddressTypesDeleteDialogComponent } from './address-types-delete-dialog.component';

@Component({
  selector: 'jhi-address-types',
  templateUrl: './address-types.component.html',
})
export class AddressTypesComponent implements OnInit, OnDestroy {
  addressTypes?: IAddressTypes[];
  eventSubscriber?: Subscription;

  constructor(
    protected addressTypesService: AddressTypesService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.addressTypesService.query().subscribe((res: HttpResponse<IAddressTypes[]>) => (this.addressTypes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAddressTypes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAddressTypes): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAddressTypes(): void {
    this.eventSubscriber = this.eventManager.subscribe('addressTypesListModification', () => this.loadAll());
  }

  delete(addressTypes: IAddressTypes): void {
    const modalRef = this.modalService.open(AddressTypesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.addressTypes = addressTypes;
  }
}
