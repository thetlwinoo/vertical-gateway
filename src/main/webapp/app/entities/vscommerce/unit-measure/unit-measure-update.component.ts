import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IUnitMeasure, UnitMeasure } from 'app/shared/model/vscommerce/unit-measure.model';
import { UnitMeasureService } from './unit-measure.service';

@Component({
  selector: 'jhi-unit-measure-update',
  templateUrl: './unit-measure-update.component.html',
})
export class UnitMeasureUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    code: [null, [Validators.required]],
    name: [null, [Validators.required]],
  });

  constructor(protected unitMeasureService: UnitMeasureService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ unitMeasure }) => {
      this.updateForm(unitMeasure);
    });
  }

  updateForm(unitMeasure: IUnitMeasure): void {
    this.editForm.patchValue({
      id: unitMeasure.id,
      code: unitMeasure.code,
      name: unitMeasure.name,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const unitMeasure = this.createFromForm();
    if (unitMeasure.id !== undefined) {
      this.subscribeToSaveResponse(this.unitMeasureService.update(unitMeasure));
    } else {
      this.subscribeToSaveResponse(this.unitMeasureService.create(unitMeasure));
    }
  }

  private createFromForm(): IUnitMeasure {
    return {
      ...new UnitMeasure(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUnitMeasure>>): void {
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
