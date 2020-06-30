import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITrackingEvent } from 'app/shared/model/vscommerce/tracking-event.model';

@Component({
  selector: 'jhi-tracking-event-detail',
  templateUrl: './tracking-event-detail.component.html',
})
export class TrackingEventDetailComponent implements OnInit {
  trackingEvent: ITrackingEvent | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ trackingEvent }) => (this.trackingEvent = trackingEvent));
  }

  previousState(): void {
    window.history.back();
  }
}
