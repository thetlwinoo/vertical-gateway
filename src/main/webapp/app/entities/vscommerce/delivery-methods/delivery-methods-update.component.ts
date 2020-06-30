import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IDeliveryMethods, DeliveryMethods } from 'app/shared/model/vscommerce/delivery-methods.model';
import { DeliveryMethodsService } from './delivery-methods.service';

@Component({
  selector: 'jhi-delivery-methods-update',
  templateUrl: './delivery-methods-update.component.html',
})
export class DeliveryMethodsUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    thirdPartyName: [],
    expectedMinArrivalDays: [],
    expectedMaxArrivalDays: [],
    activeInd: [],
    defaultInd: [],
    deliveryNote: [],
    validFrom: [null, [Validators.required]],
    validTo: [null, [Validators.required]],
  });

  constructor(
    protected deliveryMethodsService: DeliveryMethodsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ deliveryMethods }) => {
      if (!deliveryMethods.id) {
        const today = moment().startOf('day');
        deliveryMethods.validFrom = today;
        deliveryMethods.validTo = today;
      }

      this.updateForm(deliveryMethods);
    });
  }

  updateForm(deliveryMethods: IDeliveryMethods): void {
    this.editForm.patchValue({
      id: deliveryMethods.id,
      name: deliveryMethods.name,
      thirdPartyName: deliveryMethods.thirdPartyName,
      expectedMinArrivalDays: deliveryMethods.expectedMinArrivalDays,
      expectedMaxArrivalDays: deliveryMethods.expectedMaxArrivalDays,
      activeInd: deliveryMethods.activeInd,
      defaultInd: deliveryMethods.defaultInd,
      deliveryNote: deliveryMethods.deliveryNote,
      validFrom: deliveryMethods.validFrom ? deliveryMethods.validFrom.format(DATE_TIME_FORMAT) : null,
      validTo: deliveryMethods.validTo ? deliveryMethods.validTo.format(DATE_TIME_FORMAT) : null,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const deliveryMethods = this.createFromForm();
    if (deliveryMethods.id !== undefined) {
      this.subscribeToSaveResponse(this.deliveryMethodsService.update(deliveryMethods));
    } else {
      this.subscribeToSaveResponse(this.deliveryMethodsService.create(deliveryMethods));
    }
  }

  private createFromForm(): IDeliveryMethods {
    return {
      ...new DeliveryMethods(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      thirdPartyName: this.editForm.get(['thirdPartyName'])!.value,
      expectedMinArrivalDays: this.editForm.get(['expectedMinArrivalDays'])!.value,
      expectedMaxArrivalDays: this.editForm.get(['expectedMaxArrivalDays'])!.value,
      activeInd: this.editForm.get(['activeInd'])!.value,
      defaultInd: this.editForm.get(['defaultInd'])!.value,
      deliveryNote: this.editForm.get(['deliveryNote'])!.value,
      validFrom: this.editForm.get(['validFrom'])!.value ? moment(this.editForm.get(['validFrom'])!.value, DATE_TIME_FORMAT) : undefined,
      validTo: this.editForm.get(['validTo'])!.value ? moment(this.editForm.get(['validTo'])!.value, DATE_TIME_FORMAT) : undefined,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDeliveryMethods>>): void {
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
