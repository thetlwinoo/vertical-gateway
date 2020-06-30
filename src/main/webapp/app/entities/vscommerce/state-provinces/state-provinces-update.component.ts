import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IStateProvinces, StateProvinces } from 'app/shared/model/vscommerce/state-provinces.model';
import { StateProvincesService } from './state-provinces.service';
import { ICountries } from 'app/shared/model/vscommerce/countries.model';
import { CountriesService } from 'app/entities/vscommerce/countries/countries.service';

@Component({
  selector: 'jhi-state-provinces-update',
  templateUrl: './state-provinces-update.component.html',
})
export class StateProvincesUpdateComponent implements OnInit {
  isSaving = false;
  countries: ICountries[] = [];

  editForm = this.fb.group({
    id: [],
    code: [null, [Validators.required]],
    name: [null, [Validators.required]],
    salesTerritory: [null, [Validators.required]],
    border: [],
    latestRecordedPopulation: [],
    validFrom: [null, [Validators.required]],
    validTo: [null, [Validators.required]],
    countryId: [],
  });

  constructor(
    protected stateProvincesService: StateProvincesService,
    protected countriesService: CountriesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ stateProvinces }) => {
      if (!stateProvinces.id) {
        const today = moment().startOf('day');
        stateProvinces.validFrom = today;
        stateProvinces.validTo = today;
      }

      this.updateForm(stateProvinces);

      this.countriesService.query().subscribe((res: HttpResponse<ICountries[]>) => (this.countries = res.body || []));
    });
  }

  updateForm(stateProvinces: IStateProvinces): void {
    this.editForm.patchValue({
      id: stateProvinces.id,
      code: stateProvinces.code,
      name: stateProvinces.name,
      salesTerritory: stateProvinces.salesTerritory,
      border: stateProvinces.border,
      latestRecordedPopulation: stateProvinces.latestRecordedPopulation,
      validFrom: stateProvinces.validFrom ? stateProvinces.validFrom.format(DATE_TIME_FORMAT) : null,
      validTo: stateProvinces.validTo ? stateProvinces.validTo.format(DATE_TIME_FORMAT) : null,
      countryId: stateProvinces.countryId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const stateProvinces = this.createFromForm();
    if (stateProvinces.id !== undefined) {
      this.subscribeToSaveResponse(this.stateProvincesService.update(stateProvinces));
    } else {
      this.subscribeToSaveResponse(this.stateProvincesService.create(stateProvinces));
    }
  }

  private createFromForm(): IStateProvinces {
    return {
      ...new StateProvinces(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value,
      name: this.editForm.get(['name'])!.value,
      salesTerritory: this.editForm.get(['salesTerritory'])!.value,
      border: this.editForm.get(['border'])!.value,
      latestRecordedPopulation: this.editForm.get(['latestRecordedPopulation'])!.value,
      validFrom: this.editForm.get(['validFrom'])!.value ? moment(this.editForm.get(['validFrom'])!.value, DATE_TIME_FORMAT) : undefined,
      validTo: this.editForm.get(['validTo'])!.value ? moment(this.editForm.get(['validTo'])!.value, DATE_TIME_FORMAT) : undefined,
      countryId: this.editForm.get(['countryId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStateProvinces>>): void {
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

  trackById(index: number, item: ICountries): any {
    return item.id;
  }
}
