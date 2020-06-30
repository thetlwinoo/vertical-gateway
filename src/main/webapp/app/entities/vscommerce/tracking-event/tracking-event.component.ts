import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITrackingEvent } from 'app/shared/model/vscommerce/tracking-event.model';
import { TrackingEventService } from './tracking-event.service';
import { TrackingEventDeleteDialogComponent } from './tracking-event-delete-dialog.component';

@Component({
  selector: 'jhi-tracking-event',
  templateUrl: './tracking-event.component.html',
})
export class TrackingEventComponent implements OnInit, OnDestroy {
  trackingEvents?: ITrackingEvent[];
  eventSubscriber?: Subscription;

  constructor(
    protected trackingEventService: TrackingEventService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.trackingEventService.query().subscribe((res: HttpResponse<ITrackingEvent[]>) => (this.trackingEvents = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTrackingEvents();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITrackingEvent): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTrackingEvents(): void {
    this.eventSubscriber = this.eventManager.subscribe('trackingEventListModification', () => this.loadAll());
  }

  delete(trackingEvent: ITrackingEvent): void {
    const modalRef = this.modalService.open(TrackingEventDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.trackingEvent = trackingEvent;
  }
}
