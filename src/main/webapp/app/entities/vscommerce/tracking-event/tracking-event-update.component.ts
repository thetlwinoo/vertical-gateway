import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITrackingEvent, TrackingEvent } from 'app/shared/model/vscommerce/tracking-event.model';
import { TrackingEventService } from './tracking-event.service';

@Component({
  selector: 'jhi-tracking-event-update',
  templateUrl: './tracking-event-update.component.html',
})
export class TrackingEventUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
  });

  constructor(protected trackingEventService: TrackingEventService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ trackingEvent }) => {
      this.updateForm(trackingEvent);
    });
  }

  updateForm(trackingEvent: ITrackingEvent): void {
    this.editForm.patchValue({
      id: trackingEvent.id,
      name: trackingEvent.name,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const trackingEvent = this.createFromForm();
    if (trackingEvent.id !== undefined) {
      this.subscribeToSaveResponse(this.trackingEventService.update(trackingEvent));
    } else {
      this.subscribeToSaveResponse(this.trackingEventService.create(trackingEvent));
    }
  }

  private createFromForm(): ITrackingEvent {
    return {
      ...new TrackingEvent(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITrackingEvent>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
