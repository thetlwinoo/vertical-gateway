import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IDiscountTypes, DiscountTypes } from 'app/shared/model/vscommerce/discount-types.model';
import { DiscountTypesService } from './discount-types.service';

@Component({
  selector: 'jhi-discount-types-update',
  templateUrl: './discount-types-update.component.html',
})
export class DiscountTypesUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    modifiedDate: [null, [Validators.required]],
  });

  constructor(protected discountTypesService: DiscountTypesService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ discountTypes }) => {
      if (!discountTypes.id) {
        const today = moment().startOf('day');
        discountTypes.modifiedDate = today;
      }

      this.updateForm(discountTypes);
    });
  }

  updateForm(discountTypes: IDiscountTypes): void {
    this.editForm.patchValue({
      id: discountTypes.id,
      name: discountTypes.name,
      modifiedDate: discountTypes.modifiedDate ? discountTypes.modifiedDate.format(DATE_TIME_FORMAT) : null,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const discountTypes = this.createFromForm();
    if (discountTypes.id !== undefined) {
      this.subscribeToSaveResponse(this.discountTypesService.update(discountTypes));
    } else {
      this.subscribeToSaveResponse(this.discountTypesService.create(discountTypes));
    }
  }

  private createFromForm(): IDiscountTypes {
    return {
      ...new DiscountTypes(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      modifiedDate: this.editForm.get(['modifiedDate'])!.value
        ? moment(this.editForm.get(['modifiedDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDiscountTypes>>): void {
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
