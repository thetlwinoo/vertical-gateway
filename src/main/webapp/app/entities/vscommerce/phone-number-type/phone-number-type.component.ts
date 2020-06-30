import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPhoneNumberType } from 'app/shared/model/vscommerce/phone-number-type.model';
import { PhoneNumberTypeService } from './phone-number-type.service';
import { PhoneNumberTypeDeleteDialogComponent } from './phone-number-type-delete-dialog.component';

@Component({
  selector: 'jhi-phone-number-type',
  templateUrl: './phone-number-type.component.html',
})
export class PhoneNumberTypeComponent implements OnInit, OnDestroy {
  phoneNumberTypes?: IPhoneNumberType[];
  eventSubscriber?: Subscription;

  constructor(
    protected phoneNumberTypeService: PhoneNumberTypeService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.phoneNumberTypeService.query().subscribe((res: HttpResponse<IPhoneNumberType[]>) => (this.phoneNumberTypes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPhoneNumberTypes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPhoneNumberType): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPhoneNumberTypes(): void {
    this.eventSubscriber = this.eventManager.subscribe('phoneNumberTypeListModification', () => this.loadAll());
  }

  delete(phoneNumberType: IPhoneNumberType): void {
    const modalRef = this.modalService.open(PhoneNumberTypeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.phoneNumberType = phoneNumberType;
  }
}
