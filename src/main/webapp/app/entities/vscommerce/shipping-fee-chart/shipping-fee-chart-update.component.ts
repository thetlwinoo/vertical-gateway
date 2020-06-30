import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IShippingFeeChart, ShippingFeeChart } from 'app/shared/model/vscommerce/shipping-fee-chart.model';
import { ShippingFeeChartService } from './shipping-fee-chart.service';
import { IZone } from 'app/shared/model/vscommerce/zone.model';
import { ZoneService } from 'app/entities/vscommerce/zone/zone.service';
import { IDeliveryMethods } from 'app/shared/model/vscommerce/delivery-methods.model';
import { DeliveryMethodsService } from 'app/entities/vscommerce/delivery-methods/delivery-methods.service';

type SelectableEntity = IZone | IDeliveryMethods;

@Component({
  selector: 'jhi-shipping-fee-chart-update',
  templateUrl: './shipping-fee-chart-update.component.html',
})
export class ShippingFeeChartUpdateComponent implements OnInit {
  isSaving = false;
  zones: IZone[] = [];
  deliverymethods: IDeliveryMethods[] = [];

  editForm = this.fb.group({
    id: [],
    sizeOfPercel: [null, [Validators.required]],
    minVolumeWeight: [null, [Validators.required]],
    maxVolumeWeight: [null, [Validators.required]],
    minActualWeight: [null, [Validators.required]],
    maxActualWeight: [null, [Validators.required]],
    price: [null, [Validators.required]],
    lastEditedBy: [null, [Validators.required]],
    lastEditedWhen: [null, [Validators.required]],
    zoneId: [],
    deliveryMethodId: [],
  });

  constructor(
    protected shippingFeeChartService: ShippingFeeChartService,
    protected zoneService: ZoneService,
    protected deliveryMethodsService: DeliveryMethodsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ shippingFeeChart }) => {
      if (!shippingFeeChart.id) {
        const today = moment().startOf('day');
        shippingFeeChart.lastEditedWhen = today;
      }

      this.updateForm(shippingFeeChart);

      this.zoneService.query().subscribe((res: HttpResponse<IZone[]>) => (this.zones = res.body || []));

      this.deliveryMethodsService.query().subscribe((res: HttpResponse<IDeliveryMethods[]>) => (this.deliverymethods = res.body || []));
    });
  }

  updateForm(shippingFeeChart: IShippingFeeChart): void {
    this.editForm.patchValue({
      id: shippingFeeChart.id,
      sizeOfPercel: shippingFeeChart.sizeOfPercel,
      minVolumeWeight: shippingFeeChart.minVolumeWeight,
      maxVolumeWeight: shippingFeeChart.maxVolumeWeight,
      minActualWeight: shippingFeeChart.minActualWeight,
      maxActualWeight: shippingFeeChart.maxActualWeight,
      price: shippingFeeChart.price,
      lastEditedBy: shippingFeeChart.lastEditedBy,
      lastEditedWhen: shippingFeeChart.lastEditedWhen ? shippingFeeChart.lastEditedWhen.format(DATE_TIME_FORMAT) : null,
      zoneId: shippingFeeChart.zoneId,
      deliveryMethodId: shippingFeeChart.deliveryMethodId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const shippingFeeChart = this.createFromForm();
    if (shippingFeeChart.id !== undefined) {
      this.subscribeToSaveResponse(this.shippingFeeChartService.update(shippingFeeChart));
    } else {
      this.subscribeToSaveResponse(this.shippingFeeChartService.create(shippingFeeChart));
    }
  }

  private createFromForm(): IShippingFeeChart {
    return {
      ...new ShippingFeeChart(),
      id: this.editForm.get(['id'])!.value,
      sizeOfPercel: this.editForm.get(['sizeOfPercel'])!.value,
      minVolumeWeight: this.editForm.get(['minVolumeWeight'])!.value,
      maxVolumeWeight: this.editForm.get(['maxVolumeWeight'])!.value,
      minActualWeight: this.editForm.get(['minActualWeight'])!.value,
      maxActualWeight: this.editForm.get(['maxActualWeight'])!.value,
      price: this.editForm.get(['price'])!.value,
      lastEditedBy: this.editForm.get(['lastEditedBy'])!.value,
      lastEditedWhen: this.editForm.get(['lastEditedWhen'])!.value
        ? moment(this.editForm.get(['lastEditedWhen'])!.value, DATE_TIME_FORMAT)
        : undefined,
      zoneId: this.editForm.get(['zoneId'])!.value,
      deliveryMethodId: this.editForm.get(['deliveryMethodId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IShippingFeeChart>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
