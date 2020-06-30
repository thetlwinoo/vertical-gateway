import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ILogistics, Logistics } from 'app/shared/model/vscommerce/logistics.model';
import { LogisticsService } from './logistics.service';

@Component({
  selector: 'jhi-logistics-update',
  templateUrl: './logistics-update.component.html',
})
export class LogisticsUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    activeInd: [null, [Validators.required]],
    lastEditedBy: [null, [Validators.required]],
    lastEditedWhen: [null, [Validators.required]],
  });

  constructor(protected logisticsService: LogisticsService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ logistics }) => {
      if (!logistics.id) {
        const today = moment().startOf('day');
        logistics.lastEditedWhen = today;
      }

      this.updateForm(logistics);
    });
  }

  updateForm(logistics: ILogistics): void {
    this.editForm.patchValue({
      id: logistics.id,
      name: logistics.name,
      activeInd: logistics.activeInd,
      lastEditedBy: logistics.lastEditedBy,
      lastEditedWhen: logistics.lastEditedWhen ? logistics.lastEditedWhen.format(DATE_TIME_FORMAT) : null,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const logistics = this.createFromForm();
    if (logistics.id !== undefined) {
      this.subscribeToSaveResponse(this.logisticsService.update(logistics));
    } else {
      this.subscribeToSaveResponse(this.logisticsService.create(logistics));
    }
  }

  private createFromForm(): ILogistics {
    return {
      ...new Logistics(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      activeInd: this.editForm.get(['activeInd'])!.value,
      lastEditedBy: this.editForm.get(['lastEditedBy'])!.value,
      lastEditedWhen: this.editForm.get(['lastEditedWhen'])!.value
        ? moment(this.editForm.get(['lastEditedWhen'])!.value, DATE_TIME_FORMAT)
        : undefined,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILogistics>>): void {
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
