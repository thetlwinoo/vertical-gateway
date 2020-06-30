import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICountries, Countries } from 'app/shared/model/vscommerce/countries.model';
import { CountriesService } from './countries.service';

@Component({
  selector: 'jhi-countries-update',
  templateUrl: './countries-update.component.html',
})
export class CountriesUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    formalName: [null, [Validators.required]],
    isoAplha3Code: [],
    isoNumericCode: [],
    countryType: [],
    latestRecordedPopulation: [],
    continent: [null, [Validators.required]],
    region: [null, [Validators.required]],
    subregion: [null, [Validators.required]],
    border: [],
    validFrom: [null, [Validators.required]],
    validTo: [null, [Validators.required]],
  });

  constructor(protected countriesService: CountriesService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ countries }) => {
      if (!countries.id) {
        const today = moment().startOf('day');
        countries.validFrom = today;
        countries.validTo = today;
      }

      this.updateForm(countries);
    });
  }

  updateForm(countries: ICountries): void {
    this.editForm.patchValue({
      id: countries.id,
      name: countries.name,
      formalName: countries.formalName,
      isoAplha3Code: countries.isoAplha3Code,
      isoNumericCode: countries.isoNumericCode,
      countryType: countries.countryType,
      latestRecordedPopulation: countries.latestRecordedPopulation,
      continent: countries.continent,
      region: countries.region,
      subregion: countries.subregion,
      border: countries.border,
      validFrom: countries.validFrom ? countries.validFrom.format(DATE_TIME_FORMAT) : null,
      validTo: countries.validTo ? countries.validTo.format(DATE_TIME_FORMAT) : null,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const countries = this.createFromForm();
    if (countries.id !== undefined) {
      this.subscribeToSaveResponse(this.countriesService.update(countries));
    } else {
      this.subscribeToSaveResponse(this.countriesService.create(countries));
    }
  }

  private createFromForm(): ICountries {
    return {
      ...new Countries(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      formalName: this.editForm.get(['formalName'])!.value,
      isoAplha3Code: this.editForm.get(['isoAplha3Code'])!.value,
      isoNumericCode: this.editForm.get(['isoNumericCode'])!.value,
      countryType: this.editForm.get(['countryType'])!.value,
      latestRecordedPopulation: this.editForm.get(['latestRecordedPopulation'])!.value,
      continent: this.editForm.get(['continent'])!.value,
      region: this.editForm.get(['region'])!.value,
      subregion: this.editForm.get(['subregion'])!.value,
      border: this.editForm.get(['border'])!.value,
      validFrom: this.editForm.get(['validFrom'])!.value ? moment(this.editForm.get(['validFrom'])!.value, DATE_TIME_FORMAT) : undefined,
      validTo: this.editForm.get(['validTo'])!.value ? moment(this.editForm.get(['validTo'])!.value, DATE_TIME_FORMAT) : undefined,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICountries>>): void {
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
