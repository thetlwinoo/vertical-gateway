import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IColdRoomTemperatures, ColdRoomTemperatures } from 'app/shared/model/vscommerce/cold-room-temperatures.model';
import { ColdRoomTemperaturesService } from './cold-room-temperatures.service';

@Component({
  selector: 'jhi-cold-room-temperatures-update',
  templateUrl: './cold-room-temperatures-update.component.html',
})
export class ColdRoomTemperaturesUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    coldRoomSensorNumber: [null, [Validators.required]],
    recordedWhen: [null, [Validators.required]],
    temperature: [null, [Validators.required]],
    validFrom: [null, [Validators.required]],
    validTo: [null, [Validators.required]],
  });

  constructor(
    protected coldRoomTemperaturesService: ColdRoomTemperaturesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ coldRoomTemperatures }) => {
      if (!coldRoomTemperatures.id) {
        const today = moment().startOf('day');
        coldRoomTemperatures.recordedWhen = today;
        coldRoomTemperatures.validFrom = today;
        coldRoomTemperatures.validTo = today;
      }

      this.updateForm(coldRoomTemperatures);
    });
  }

  updateForm(coldRoomTemperatures: IColdRoomTemperatures): void {
    this.editForm.patchValue({
      id: coldRoomTemperatures.id,
      coldRoomSensorNumber: coldRoomTemperatures.coldRoomSensorNumber,
      recordedWhen: coldRoomTemperatures.recordedWhen ? coldRoomTemperatures.recordedWhen.format(DATE_TIME_FORMAT) : null,
      temperature: coldRoomTemperatures.temperature,
      validFrom: coldRoomTemperatures.validFrom ? coldRoomTemperatures.validFrom.format(DATE_TIME_FORMAT) : null,
      validTo: coldRoomTemperatures.validTo ? coldRoomTemperatures.validTo.format(DATE_TIME_FORMAT) : null,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const coldRoomTemperatures = this.createFromForm();
    if (coldRoomTemperatures.id !== undefined) {
      this.subscribeToSaveResponse(this.coldRoomTemperaturesService.update(coldRoomTemperatures));
    } else {
      this.subscribeToSaveResponse(this.coldRoomTemperaturesService.create(coldRoomTemperatures));
    }
  }

  private createFromForm(): IColdRoomTemperatures {
    return {
      ...new ColdRoomTemperatures(),
      id: this.editForm.get(['id'])!.value,
      coldRoomSensorNumber: this.editForm.get(['coldRoomSensorNumber'])!.value,
      recordedWhen: this.editForm.get(['recordedWhen'])!.value
        ? moment(this.editForm.get(['recordedWhen'])!.value, DATE_TIME_FORMAT)
        : undefined,
      temperature: this.editForm.get(['temperature'])!.value,
      validFrom: this.editForm.get(['validFrom'])!.value ? moment(this.editForm.get(['validFrom'])!.value, DATE_TIME_FORMAT) : undefined,
      validTo: this.editForm.get(['validTo'])!.value ? moment(this.editForm.get(['validTo'])!.value, DATE_TIME_FORMAT) : undefined,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IColdRoomTemperatures>>): void {
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
