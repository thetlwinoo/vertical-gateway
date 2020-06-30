import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICreditCardType, CreditCardType } from 'app/shared/model/vscommerce/credit-card-type.model';
import { CreditCardTypeService } from './credit-card-type.service';

@Component({
  selector: 'jhi-credit-card-type-update',
  templateUrl: './credit-card-type-update.component.html',
})
export class CreditCardTypeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
    modifiedDate: [],
  });

  constructor(protected creditCardTypeService: CreditCardTypeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ creditCardType }) => {
      if (!creditCardType.id) {
        const today = moment().startOf('day');
        creditCardType.modifiedDate = today;
      }

      this.updateForm(creditCardType);
    });
  }

  updateForm(creditCardType: ICreditCardType): void {
    this.editForm.patchValue({
      id: creditCardType.id,
      name: creditCardType.name,
      modifiedDate: creditCardType.modifiedDate ? creditCardType.modifiedDate.format(DATE_TIME_FORMAT) : null,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const creditCardType = this.createFromForm();
    if (creditCardType.id !== undefined) {
      this.subscribeToSaveResponse(this.creditCardTypeService.update(creditCardType));
    } else {
      this.subscribeToSaveResponse(this.creditCardTypeService.create(creditCardType));
    }
  }

  private createFromForm(): ICreditCardType {
    return {
      ...new CreditCardType(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      modifiedDate: this.editForm.get(['modifiedDate'])!.value
        ? moment(this.editForm.get(['modifiedDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICreditCardType>>): void {
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
