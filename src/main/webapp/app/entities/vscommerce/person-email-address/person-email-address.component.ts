import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPersonEmailAddress } from 'app/shared/model/vscommerce/person-email-address.model';
import { PersonEmailAddressService } from './person-email-address.service';
import { PersonEmailAddressDeleteDialogComponent } from './person-email-address-delete-dialog.component';

@Component({
  selector: 'jhi-person-email-address',
  templateUrl: './person-email-address.component.html',
})
export class PersonEmailAddressComponent implements OnInit, OnDestroy {
  personEmailAddresses?: IPersonEmailAddress[];
  eventSubscriber?: Subscription;

  constructor(
    protected personEmailAddressService: PersonEmailAddressService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.personEmailAddressService
      .query()
      .subscribe((res: HttpResponse<IPersonEmailAddress[]>) => (this.personEmailAddresses = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPersonEmailAddresses();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPersonEmailAddress): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPersonEmailAddresses(): void {
    this.eventSubscriber = this.eventManager.subscribe('personEmailAddressListModification', () => this.loadAll());
  }

  delete(personEmailAddress: IPersonEmailAddress): void {
    const modalRef = this.modalService.open(PersonEmailAddressDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.personEmailAddress = personEmailAddress;
  }
}
