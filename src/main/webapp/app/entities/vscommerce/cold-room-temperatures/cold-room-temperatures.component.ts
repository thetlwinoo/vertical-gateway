import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IColdRoomTemperatures } from 'app/shared/model/vscommerce/cold-room-temperatures.model';
import { ColdRoomTemperaturesService } from './cold-room-temperatures.service';
import { ColdRoomTemperaturesDeleteDialogComponent } from './cold-room-temperatures-delete-dialog.component';

@Component({
  selector: 'jhi-cold-room-temperatures',
  templateUrl: './cold-room-temperatures.component.html',
})
export class ColdRoomTemperaturesComponent implements OnInit, OnDestroy {
  coldRoomTemperatures?: IColdRoomTemperatures[];
  eventSubscriber?: Subscription;

  constructor(
    protected coldRoomTemperaturesService: ColdRoomTemperaturesService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.coldRoomTemperaturesService
      .query()
      .subscribe((res: HttpResponse<IColdRoomTemperatures[]>) => (this.coldRoomTemperatures = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInColdRoomTemperatures();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IColdRoomTemperatures): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInColdRoomTemperatures(): void {
    this.eventSubscriber = this.eventManager.subscribe('coldRoomTemperaturesListModification', () => this.loadAll());
  }

  delete(coldRoomTemperatures: IColdRoomTemperatures): void {
    const modalRef = this.modalService.open(ColdRoomTemperaturesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.coldRoomTemperatures = coldRoomTemperatures;
  }
}
