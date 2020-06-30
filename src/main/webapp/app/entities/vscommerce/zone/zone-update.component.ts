import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IZone, Zone } from 'app/shared/model/vscommerce/zone.model';
import { ZoneService } from './zone.service';
import { ICities } from 'app/shared/model/vscommerce/cities.model';
import { CitiesService } from 'app/entities/vscommerce/cities/cities.service';

@Component({
  selector: 'jhi-zone-update',
  templateUrl: './zone-update.component.html',
})
export class ZoneUpdateComponent implements OnInit {
  isSaving = false;
  cities: ICities[] = [];

  editForm = this.fb.group({
    id: [],
    code: [null, [Validators.required]],
    name: [null, [Validators.required]],
    validFrom: [null, [Validators.required]],
    validTo: [null, [Validators.required]],
    cityId: [],
  });

  constructor(
    protected zoneService: ZoneService,
    protected citiesService: CitiesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ zone }) => {
      if (!zone.id) {
        const today = moment().startOf('day');
        zone.validFrom = today;
        zone.validTo = today;
      }

      this.updateForm(zone);

      this.citiesService.query().subscribe((res: HttpResponse<ICities[]>) => (this.cities = res.body || []));
    });
  }

  updateForm(zone: IZone): void {
    this.editForm.patchValue({
      id: zone.id,
      code: zone.code,
      name: zone.name,
      validFrom: zone.validFrom ? zone.validFrom.format(DATE_TIME_FORMAT) : null,
      validTo: zone.validTo ? zone.validTo.format(DATE_TIME_FORMAT) : null,
      cityId: zone.cityId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const zone = this.createFromForm();
    if (zone.id !== undefined) {
      this.subscribeToSaveResponse(this.zoneService.update(zone));
    } else {
      this.subscribeToSaveResponse(this.zoneService.create(zone));
    }
  }

  private createFromForm(): IZone {
    return {
      ...new Zone(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value,
      name: this.editForm.get(['name'])!.value,
      validFrom: this.editForm.get(['validFrom'])!.value ? moment(this.editForm.get(['validFrom'])!.value, DATE_TIME_FORMAT) : undefined,
      validTo: this.editForm.get(['validTo'])!.value ? moment(this.editForm.get(['validTo'])!.value, DATE_TIME_FORMAT) : undefined,
      cityId: this.editForm.get(['cityId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IZone>>): void {
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
