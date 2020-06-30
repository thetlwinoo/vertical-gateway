import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICities, Cities } from 'app/shared/model/vscommerce/cities.model';
import { CitiesService } from './cities.service';
import { IStateProvinces } from 'app/shared/model/vscommerce/state-provinces.model';
import { StateProvincesService } from 'app/entities/vscommerce/state-provinces/state-provinces.service';

@Component({
  selector: 'jhi-cities-update',
  templateUrl: './cities-update.component.html',
})
export class CitiesUpdateComponent implements OnInit {
  isSaving = false;
  stateprovinces: IStateProvinces[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    location: [],
    latestRecordedPopulation: [],
    validFrom: [null, [Validators.required]],
    validTo: [null, [Validators.required]],
    stateProvinceId: [],
  });

  constructor(
    protected citiesService: CitiesService,
    protected stateProvincesService: StateProvincesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cities }) => {
      if (!cities.id) {
        const today = moment().startOf('day');
        cities.validFrom = today;
        cities.validTo = today;
      }

      this.updateForm(cities);

      this.stateProvincesService.query().subscribe((res: HttpResponse<IStateProvinces[]>) => (this.stateprovinces = res.body || []));
    });
  }

  updateForm(cities: ICities): void {
    this.editForm.patchValue({
      id: cities.id,
      name: cities.name,
      location: cities.location,
      latestRecordedPopulation: cities.latestRecordedPopulation,
      validFrom: cities.validFrom ? cities.validFrom.format(DATE_TIME_FORMAT) : null,
      validTo: cities.validTo ? cities.validTo.format(DATE_TIME_FORMAT) : null,
      stateProvinceId: cities.stateProvinceId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cities = this.createFromForm();
    if (cities.id !== undefined) {
      this.subscribeToSaveResponse(this.citiesService.update(cities));
    } else {
      this.subscribeToSaveResponse(this.citiesService.create(cities));
    }
  }

  private createFromForm(): ICities {
    return {
      ...new Cities(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      location: this.editForm.get(['location'])!.value,
      latestRecordedPopulation: this.editForm.get(['latestRecordedPopulation'])!.value,
      validFrom: this.editForm.get(['validFrom'])!.value ? moment(this.editForm.get(['validFrom'])!.value, DATE_TIME_FORMAT) : undefined,
      validTo: this.editForm.get(['validTo'])!.value ? moment(this.editForm.get(['validTo'])!.value, DATE_TIME_FORMAT) : undefined,
      stateProvinceId: this.editForm.get(['stateProvinceId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICities>>): void {
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

  trackById(index: number, item: IStateProvinces): any {
    return item.id;
  }
}
