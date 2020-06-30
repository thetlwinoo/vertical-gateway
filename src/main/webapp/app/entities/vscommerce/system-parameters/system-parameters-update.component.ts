import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISystemParameters, SystemParameters } from 'app/shared/model/vscommerce/system-parameters.model';
import { SystemParametersService } from './system-parameters.service';
import { ICities } from 'app/shared/model/vscommerce/cities.model';
import { CitiesService } from 'app/entities/vscommerce/cities/cities.service';

@Component({
  selector: 'jhi-system-parameters-update',
  templateUrl: './system-parameters-update.component.html',
})
export class SystemParametersUpdateComponent implements OnInit {
  isSaving = false;
  cities: ICities[] = [];

  editForm = this.fb.group({
    id: [],
    applicationSettings: [null, [Validators.required]],
    deliveryCityId: [],
    postalCityId: [],
  });

  constructor(
    protected systemParametersService: SystemParametersService,
    protected citiesService: CitiesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ systemParameters }) => {
      this.updateForm(systemParameters);

      this.citiesService.query().subscribe((res: HttpResponse<ICities[]>) => (this.cities = res.body || []));
    });
  }

  updateForm(systemParameters: ISystemParameters): void {
    this.editForm.patchValue({
      id: systemParameters.id,
      applicationSettings: systemParameters.applicationSettings,
      deliveryCityId: systemParameters.deliveryCityId,
      postalCityId: systemParameters.postalCityId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const systemParameters = this.createFromForm();
    if (systemParameters.id !== undefined) {
      this.subscribeToSaveResponse(this.systemParametersService.update(systemParameters));
    } else {
      this.subscribeToSaveResponse(this.systemParametersService.create(systemParameters));
    }
  }

  private createFromForm(): ISystemParameters {
    return {
      ...new SystemParameters(),
      id: this.editForm.get(['id'])!.value,
      applicationSettings: this.editForm.get(['applicationSettings'])!.value,
      deliveryCityId: this.editForm.get(['deliveryCityId'])!.value,
      postalCityId: this.editForm.get(['postalCityId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISystemParameters>>): void {
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

  trackById(index: number, item: ICities): any {
    return item.id;
  }
}
